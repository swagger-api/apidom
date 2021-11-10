import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  Position,
  Range,
  TextEdit,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionParams } from 'vscode-languageserver-protocol';
import {
  Element,
  MemberElement,
  findAtOffset,
  isArrayElement,
  isBooleanElement,
  isMemberElement,
  isNullElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
  traverse,
} from '@swagger-api/apidom-core';

import {
  LanguageSettings,
  CompletionContext,
  ApidomCompletionItem,
} from '../../apidom-language-types';
import { getSourceMap, getSpecVersion, isMember, isObject } from '../../utils/utils';
import { isAsyncDoc, isJsonDoc } from '../../parser-factory';

export interface CompletionsCollector {
  add(suggestion: unknown): void;
  setAsIncomplete(): void;
  getNumberOfProposals(): number;
}

export interface CompletionService {
  doCompletion(
    textDocument: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    completionContext?: CompletionContext,
  ): Promise<CompletionList>;

  configure(settings?: LanguageSettings): void;
}

enum CaretContext {
  UNDEFINED,
  KEY_START,
  KEY_END,
  KEY_INNER,
  PRIMITIVE_VALUE_START,
  PRIMITIVE_VALUE_END,
  PRIMITIVE_VALUE_INNER,
  OBJECT_VALUE_START,
  OBJECT_VALUE_INNER,
  OBJECT_VALUE_END,
  MEMBER,
}

enum CompletionNodeContext {
  UNDEFINED,
  OBJECT,
  KEY,
  VALUE_OBJECT,
  VALUE_PRIMITIVE,
}

export class DefaultCompletionService implements CompletionService {
  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService | undefined;

  public constructor(jsonSchemaCompletionService?: CompletionService) {
    this.jsonSchemaCompletionService = jsonSchemaCompletionService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCompletionNode(node: Element, caretContext: CaretContext): Element {
    switch (caretContext) {
      case CaretContext.KEY_START:
        return node.parent.parent;
      case CaretContext.MEMBER:
        return (node as MemberElement).value as Element;
      default:
        return node;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private isReferenceValue(node: Element): boolean {
    // TODO move to NS adapter plugin
    // TODO replace this with checking metadata refObject in parent
    // assume it's a value node within a member
    if (isMember(node) && (node.key as Element).toValue() === '$ref') {
      return true;
    }
    const { parent } = node;
    return parent && isMember(parent) && (parent.key as Element).toValue() === '$ref';
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCaretContext(node: Element, offset: number): CaretContext {
    let caretContext: CaretContext = CaretContext.UNDEFINED;
    if (node) {
      const sm = getSourceMap(node);
      const { parent } = node;
      if (parent && isMember(parent) && parent.key === node) {
        // we are in a key node
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.KEY_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.KEY_START;
        } else {
          caretContext = CaretContext.KEY_END;
        }
        return caretContext;
      }
      if (
        isStringElement(node) ||
        isNumberElement(node) ||
        isBooleanElement(node) ||
        isNullElement(node)
      ) {
        // we must be in a value primitive node
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.PRIMITIVE_VALUE_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.PRIMITIVE_VALUE_START;
        } else {
          caretContext = CaretContext.PRIMITIVE_VALUE_END;
        }
        return caretContext;
      }
      if (isMemberElement(node)) {
        // we are right after the separator (`:`)
        caretContext = CaretContext.MEMBER;
        return caretContext;
      }
      if (isObjectElement(node) || isArrayElement(node)) {
        // we are within an object or array
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (offset > sm.offset && offset < sm.endOffset!) {
          caretContext = CaretContext.OBJECT_VALUE_INNER;
        } else if (offset === sm.offset) {
          caretContext = CaretContext.OBJECT_VALUE_START;
        } else {
          caretContext = CaretContext.OBJECT_VALUE_END;
        }
        return caretContext;
      }
    }
    return caretContext;
  }

  // eslint-disable-next-line class-methods-use-this
  private resolveCompletionNodeContext(caretContext: CaretContext): CompletionNodeContext {
    switch (caretContext) {
      case CaretContext.KEY_START:
      case CaretContext.OBJECT_VALUE_INNER:
      case CaretContext.MEMBER:
        return CompletionNodeContext.OBJECT;
      default:
        return CompletionNodeContext.UNDEFINED;
    }
  }

  private static buildJsonPointer(path: string[]): string {
    return `#/${path.join('/')}`;
  }

  /*
    see also:
      https://github.com/microsoft/monaco-editor/issues/1889
      https://github.com/microsoft/monaco-editor/issues/2070
   */
  public async doCompletion(
    textDocument: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionList> {
    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const text: string = textDocument.getText();

    const schema = false;

    // commit chars for yaml
    let valueCommitCharacters = ['\n'];
    let propertyCommitCharacters = [':'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endObjectNodeChar = '\n';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let endArrayNodeChar = '\n';

    // TODO handle also yaml and others, with specific logic for the format
    if (isJsonDoc(textDocument)) {
      // commit chars for json
      valueCommitCharacters = [',', '}', ']'];
      propertyCommitCharacters = [':'];
      endObjectNodeChar = '}'; // eslint-disable-line @typescript-eslint/no-unused-vars
      endArrayNodeChar = ']'; // eslint-disable-line @typescript-eslint/no-unused-vars
    }

    const result = await this.settings?.documentCache?.get(textDocument);
    if (!result) return CompletionList.create();
    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined) return CompletionList.create();
    const docNs: string = isAsyncDoc(text) ? 'asyncapi' : 'openapi';
    const specVersion = getSpecVersion(api);
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const offset = textDocument.offsetAt(position);
    // find the current node
    const node = findAtOffset({ offset, includeRightBound: true }, api);
    // only if we have a node
    if (node) {
      const caretContext = this.resolveCaretContext(node, offset);
      const completionNode = this.resolveCompletionNode(node, caretContext);
      const completionNodeContext = this.resolveCompletionNodeContext(caretContext);
      // const currentWord = DefaultCompletionService.getCurrentWord(textDocument, offset);

      let overwriteRange: Range | undefined;
      let quotes: string | undefined;

      const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

      const proposed: { [key: string]: CompletionItem } = {};

      const nodeSourceMap = getSourceMap(completionNode);
      const location = { offset: nodeSourceMap.offset, length: nodeSourceMap.length };

      const collector: CompletionsCollector = {
        add: (suggestion: CompletionItem) => {
          const item: CompletionItem = JSON.parse(JSON.stringify(suggestion));
          let { label } = item;
          const existing = proposed[label];
          // don't suggest properties that are already present
          if (!existing) {
            label = label.replace(/[\n]/g, '↵');
            if (label.length > 60) {
              const shortenedLabel = `${label.substr(0, 57).trim()}...`;
              if (!proposed[shortenedLabel]) {
                label = shortenedLabel;
              }
            }
            if (overwriteRange) {
              item.textEdit = TextEdit.replace(overwriteRange, item.insertText || '');
            }
            if (supportsCommitCharacters) {
              item.commitCharacters =
                item.kind === CompletionItemKind.Property
                  ? propertyCommitCharacters
                  : valueCommitCharacters;
            }
            item.label = label;
            proposed[label] = item;
            completionList.items.push(item);
          } else if (!existing.documentation) {
            existing.documentation = item.documentation;
          }
        },
        setAsIncomplete: () => {
          completionList.isIncomplete = true;
        },
        getNumberOfProposals: () => {
          return completionList.items.length;
        },
      };

      if (
        isObject(completionNode) &&
        (CompletionNodeContext.OBJECT === completionNodeContext ||
          CompletionNodeContext.VALUE_OBJECT === completionNodeContext) &&
        (caretContext === CaretContext.KEY_INNER ||
          caretContext === CaretContext.KEY_START ||
          caretContext === CaretContext.KEY_END ||
          caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.OBJECT_VALUE_INNER)
      ) {
        for (const p of completionNode) {
          if (!node.parent || node.parent !== p) {
            proposed[p.key.toValue()] = CompletionItem.create('__');
          }
        }
        const inNewLine = text.substring(offset, text.indexOf('\n', offset)).trim().length === 0;
        const apidomCompletions = DefaultCompletionService.getMetadataPropertyCompletions(
          api,
          completionNode,
          !isJsonDoc(textDocument),
          docNs,
          specVersion,
        );
        for (const item of apidomCompletions) {
          if (inNewLine) {
            // eslint-disable-next-line
            item.insertText = item.insertText?.substring(0, item.insertText?.length - 1);
          }
          collector.add(item);
        }
      } else if (
        // in a primitive value node
        !isObject(completionNode) &&
        (caretContext === CaretContext.MEMBER ||
          caretContext === CaretContext.PRIMITIVE_VALUE_INNER ||
          caretContext === CaretContext.PRIMITIVE_VALUE_END ||
          caretContext === CaretContext.PRIMITIVE_VALUE_START)
      ) {
        // TODO Apidom doesn't hold quotes in its content currently, therefore we must use text + offset
        const nodeValueFromText = text.substring(nodeSourceMap.offset, nodeSourceMap.endOffset);
        quotes =
          nodeValueFromText.charAt(0) === '"' || nodeValueFromText.charAt(0) === "'"
            ? nodeValueFromText.charAt(0)
            : undefined;
        const word = DefaultCompletionService.getCurrentWord(textDocument, offset);
        proposed[completionNode.toValue()] = CompletionItem.create('__');
        proposed[nodeValueFromText] = CompletionItem.create('__');
        // if node is not empty we must replace text
        if (nodeValueFromText.length > 0) {
          overwriteRange = Range.create(
            textDocument.positionAt(location.offset),
            textDocument.positionAt(location.offset + location.length),
          );
        } else {
          // node is empty
          overwriteRange = undefined;
        }
        let apidomCompletions: CompletionItem[] | undefined;
        // check if we are in a ref value, in this case build ref pointers
        if (this.isReferenceValue(completionNode)) {
          apidomCompletions = DefaultCompletionService.findReferencePointers(
            textDocument,
            api,
            completionNode,
            !isJsonDoc(textDocument),
          );
        } else {
          apidomCompletions = DefaultCompletionService.getMetadataPropertyCompletions(
            api,
            completionNode,
            !isJsonDoc(textDocument),
            docNs,
            specVersion,
          );
        }

        if (apidomCompletions) {
          for (const item of apidomCompletions) {
            const completionTextQuotes =
              item.insertText?.charAt(0) === '"' || item.insertText?.charAt(0) === "'"
                ? item.insertText?.charAt(0)
                : undefined;

            const unquotedOriginalInsertText = !completionTextQuotes
              ? item.insertText
              : item.insertText?.substring(1, item.insertText.length);

            if (!completionTextQuotes && quotes) {
              item.insertText = quotes + item.insertText + quotes;
            }
            /*
              see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
              contrary to docs, range must start with the request offset. Workaround is providing
              a filterText with the content of the target range
            */
            item.filterText = text.substring(location.offset, location.offset + location.length);

            if (word && word.length > 0 && unquotedOriginalInsertText?.startsWith(word)) {
              collector.add(item);
            } else if (!word) {
              collector.add(item);
            }
          }
        }
      }

      if (schema) {
        // TODO complete schema based, see json language service and "lsp" branch
        // DefaultCompletionService.getJsonSchemaPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
      } else {
        //
      }
    }

    if (this.jsonSchemaCompletionService) {
      this.jsonSchemaCompletionService
        .doCompletion(textDocument, completionParamsOrPosition, completionContext)
        .then((schemaList) => {
          completionList.items.push(...schemaList.items);
        });
    }
    return completionList;
  }

  private static getCurrentWord(document: TextDocument, offset: number) {
    let i = offset - 1;
    const text = document.getText();
    while (i >= 0 && ' \t\n\r\v"\':{[,]}'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    return text.substring(i + 1, offset);
  }

  public static findReferencePointers(
    textDocument: TextDocument,
    doc: Element,
    node: Element,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    yaml: boolean,
  ): CompletionItem[] {
    type Pointer = {
      node: Element;
      ref: string;
    };

    const result: CompletionItem[] = [];
    // get type of node (element)
    const nodeElement =
      node.parent?.parent?.getMetaProperty('referenced-element')?.toValue() ||
      node.parent?.parent?.element;
    if (!nodeElement) return result;
    // traverse all doc to find nodes of the same type which are not a ref
    const foundNodes: Element[] = [];
    let nodePath: string[] = [];
    function buildPointer(traverseNode: Element): void {
      if (!traverseNode) return;
      if (traverseNode.parent && isMember(traverseNode.parent)) {
        nodePath.unshift((traverseNode.parent.key as Element).toValue());
        buildPointer(traverseNode.parent?.parent);
      }
    }
    function findNodesOfType(traversedNode: Element): void {
      if (traversedNode.element === nodeElement) {
        if (
          !(
            isObject(traversedNode) &&
            traversedNode.get('$ref') &&
            traversedNode.get('$ref').toValue().length > 0
          )
        ) {
          foundNodes.push(traversedNode);
        }
      }
    }
    traverse(findNodesOfType, doc);
    // for each found node build its json pointer
    const pointers: Pointer[] = [];
    for (const foundNode of foundNodes) {
      nodePath = [];
      buildPointer(foundNode);
      pointers.push({ node: foundNode, ref: DefaultCompletionService.buildJsonPointer(nodePath) });
    }
    // TODO better sorting, NS plugin..
    pointers.sort((a, b) => (a.ref.split('/').length > b.ref.split('/').length ? 1 : -1));

    // build completion item
    let i = 97;
    for (const p of pointers) {
      const sm = getSourceMap(p.node);
      const item: CompletionItem = {
        label: p.ref,
        insertText: `${p.ref}$1`,
        kind: 10,
        documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
        // detail: 'replace with',
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      result.push(item);
      i += 1;
    }
    // TODO also add to completion description target fragment so user can preview
    return result;
  }

  private static getMetadataPropertyCompletions(
    doc: Element,
    node: Element,
    yaml: boolean,
    docNs: string,
    specVersion: string,
  ): CompletionItem[] {
    const apidomCompletions: ApidomCompletionItem[] = [];
    if (node.classes) {
      const set: string[] = Array.from(new Set(node.classes.toValue()));
      set.unshift(node.element);
      set.forEach((s) => {
        const classCompletions: ApidomCompletionItem[] = doc.meta
          .get('metadataMap')
          ?.get(s)
          ?.get(yaml ? 'yaml' : 'json')
          ?.get('completion')
          ?.toValue();
        if (classCompletions) {
          apidomCompletions.push(...classCompletions);
        }
        // check also parent for completions with `target` property
        // get parent
        if (node.parent && isMember(node.parent)) {
          const containerNode = node.parent.parent;
          const key = (node.parent.key as Element).toValue();
          // get metadata of parent with target
          const containerNodeSet: string[] = Array.from(new Set(containerNode.classes.toValue()));
          containerNodeSet.unshift(containerNode.element);
          containerNodeSet.forEach((containerNodeSymbol) => {
            const containerNodeClassCompletions: ApidomCompletionItem[] = doc.meta
              .get('metadataMap')
              ?.get(containerNodeSymbol)
              ?.get(yaml ? 'yaml' : 'json')
              ?.get('completion')
              ?.toValue();
            if (containerNodeClassCompletions) {
              apidomCompletions.push(
                ...containerNodeClassCompletions.filter((ci) => ci.target === key),
              );
            }
          });
        }
      });
    }
    // only keep relevant to ns/version
    return apidomCompletions.filter(
      (ci) =>
        !ci.targetSpecs ||
        (ci.targetSpecs &&
          ci.targetSpecs.some((nsv) => nsv.namespace === docNs && nsv.version === specVersion)),
    ) as CompletionItem[];
  }
}
