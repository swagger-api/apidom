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
} from '@swagger-api/apidom-core';

import { LanguageSettings, CompletionContext } from '../../apidom-language-types';
import { getSourceMap, isMember, isObject } from '../../utils/utils';
import { isJsonDoc } from '../../parser-factory';

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

    // get right parser
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

    // parse
    const result = await this.settings!.documentCache?.get(textDocument);
    if (!result) return CompletionList.create();
    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined) return CompletionList.create();

    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const offset = textDocument.offsetAt(position);
    // find the current node
    const node = findAtOffset({ offset, includeRightBound: true }, api);
    // only if we have a node
    // TODO add jsonSchema completion, see experiments/apidom-monaco and vscode-json-languageservice
    if (node) {
      // const sm = getSourceMap(node);
      const caretContext = this.resolveCaretContext(node, offset);
      const completionNode = this.resolveCompletionNode(node, caretContext);
      // const completionNodeSm = getSourceMap(completionNode);
      const completionNodeContext = this.resolveCompletionNodeContext(caretContext);
      // const currentWord = DefaultCompletionService.getCurrentWord(textDocument, offset);

      let overwriteRange: Range;

      const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

      const proposed: { [key: string]: CompletionItem } = {};

      const collector: CompletionsCollector = {
        add: (suggestion: CompletionItem) => {
          const item: CompletionItem = JSON.parse(JSON.stringify(suggestion));
          let { label } = item;
          const existing = proposed[label];
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

      // don't suggest properties that are already present
      if (
        isObject(completionNode) && // TODO added to get type check on node
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
      }

      if (schema) {
        // TODO complete schema based, see json language service and "lsp" branch
        // DefaultCompletionService.getJsonSchemaPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
      } else {
        const inNewLine = text.substring(offset, text.indexOf('\n', offset)).trim().length === 0;
        DefaultCompletionService.getMetadataPropertyCompletions(
          api,
          completionNode,
          collector,
          !isJsonDoc(textDocument),
          inNewLine,
        );
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
    while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    return text.substring(i + 1, offset);
  }

  private static getInsertTextForPlainText(text: string): string {
    // eslint-disable-next-line no-useless-escape
    return text.replace(/[\\\$\}]/g, '\\$&'); // escape $, \ and }
  }

  private static getInsertTextForValue(value: unknown, separatorAfter: string): string {
    const text = JSON.stringify(value, null, '\t');
    if (text === '{}') {
      return `{$1}${separatorAfter}`;
    }
    if (text === '[]') {
      return `[$1]${separatorAfter}`;
    }
    return this.getInsertTextForPlainText(text + separatorAfter);
  }

  private static getInsertTextForProperty(
    key: string,
    addValue: boolean,
    separatorAfter: string,
  ): string {
    const propertyText = this.getInsertTextForValue(key, '');
    if (!addValue) {
      return propertyText;
    }
    const resultText = `${propertyText}: `;

    let value;
    const nValueProposals = 0;
    if (!value || nValueProposals > 1) {
      value = '$1';
    }
    return resultText + value + separatorAfter;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static evaluateSeparatorAfter(document: TextDocument, offset: number) {
    // TODO
    return '';
  }

  private static getMetadataPropertyCompletions(
    doc: Element,
    node: Element,
    collector: CompletionsCollector,
    yaml: boolean,
    inNewLine: boolean,
  ): void {
    const apidomCompletions: CompletionItem[] = doc.meta
      .get('metadataMap')
      ?.get(node.element)
      ?.get(yaml ? 'yaml' : 'json')
      ?.get('completion')
      ?.toValue();
    if (apidomCompletions) {
      for (const item of apidomCompletions) {
        if (inNewLine) {
          item.insertText = item.insertText?.substring(0, item.insertText?.length - 1);
        }
        collector.add(item);
      }
    }
  }
}
