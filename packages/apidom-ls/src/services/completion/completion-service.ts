/* eslint-disable no-param-reassign */
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
  // findAtOffset,
  toValue,
} from '@swagger-api/apidom-core';

import {
  ApidomCompletionItem,
  CompletionContext,
  CompletionFormat,
  CompletionProvider,
  CompletionType,
  LanguageSettings,
  MergeStrategy,
  ProviderMode,
} from '../../apidom-language-types';
import {
  checkConditions,
  getSourceMap,
  // getSpecVersion,
  isMember,
  isObject,
  isArray,
  localReferencePointers,
  // isPartialKey,
  // getCurrentWord,
  perfStart,
  // perfEnd,
  debug,
  trace,
  // findNamespace,
} from '../../utils/utils';
import { standardLinterfunctions } from '../validation/linter-functions';
import {
  MustacheTag,
  findNestedPropertyKeys,
  parseMustacheTags,
  getMustacheTagInfoAtPosition,
  getMustacheStrictTagInfoAtPosition,
} from './utils';
import { context as codegenContext } from './context';

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

  registerProvider(provider: CompletionProvider): void;
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

enum PerfLabels {
  START = 'doCompletion',
  PARSE_FIRST = 'doCompletion-parse-first',
  PARSE_SECOND = 'doCompletion-parse-second',
  CORRECT_PARTIAL = 'doCompletion-correctPartialKeys',
}
export class DefaultCompletionService implements CompletionService {
  private static DELETEME = 'deleteme';

  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService | undefined;

  private completionProviders: CompletionProvider[] = [];

  public constructor(jsonSchemaCompletionService?: CompletionService) {
    this.jsonSchemaCompletionService = jsonSchemaCompletionService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.completionProviders) {
        this.completionProviders = settings.completionProviders;
      }
      for (const provider of this.completionProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      }
    }
  }

  public registerProvider(provider: CompletionProvider): void {
    this.completionProviders.push(provider);
    if (this.settings) {
      if (provider.configure) {
        provider.configure(this.settings);
      }
    }
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
    perfStart(PerfLabels.START);
    const context = !completionContext ? this.settings?.completionContext : completionContext;
    const enableFiltering = context?.enableLSPFilter;
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const text: string = textDocument.getText();

    // commit chars for yaml
    const valueCommitCharacters = ['}'];
    const propertyCommitCharacters = ['}'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const endObjectNodeChar = '}';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const endArrayNodeChar = '}';

    const offset = textDocument.offsetAt(position);
    debug('doCompletion - position and offset', position, offset);
    trace('doCompletion - text', text);

    const theStack: MustacheTag[] = [];
    const theRootTags: MustacheTag[] = [];
    const tags = parseMustacheTags(text, theStack, theRootTags);

    const tagInfo = getMustacheTagInfoAtPosition(tags, offset);
    const tagInfoStrict = getMustacheStrictTagInfoAtPosition(tags, offset);
    if (!tagInfo || !tagInfoStrict) {
      return completionList;
    }
    // let pointer = tagInfo.tagName;
    const pointer = [tagInfo.tagName];
    let tagParent = tagInfo.parent;
    while (tagParent) {
      pointer.unshift(tagParent.tagName);
      tagParent = tagParent.parent;
    }
    console.log(pointer.join('.'));
    const rawSuggestions = findNestedPropertyKeys(codegenContext, pointer);

    // let completionNode: Element | undefined;
    if (rawSuggestions && Array.isArray(rawSuggestions) && rawSuggestions.length > 0) {
      const apidomCompletions: CompletionItem[] = [];
      for (const rawSuggestion of rawSuggestions) {
        const item: CompletionItem = {
          label: rawSuggestion,
          insertText: rawSuggestion,
          kind: CompletionItemKind.Keyword,
          insertTextFormat: 2,
        };
        apidomCompletions.push(item);
      }

      // const caretContext = this.resolveCaretContext(node, targetOffset, textModified);
      // completionNode = this.resolveCompletionNode(node, caretContext);
      // const completionNodeContext = this.resolveCompletionNodeContext(caretContext);

      // debug('doCompletion - node', node.element, toValue(node));
      // debug('doCompletion - completionNode', completionNode.element, toValue(completionNode));
      // debug('doCompletion - caretContext', caretContext);
      // debug('doCompletion - completionNodeContext', completionNodeContext);

      let overwriteRange: Range | undefined;
      // let quotes: string | undefined;

      const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

      const proposed: { [key: string]: CompletionItem } = {};

      // const nodeSourceMap = getSourceMap(completionNode);
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
          } else if (!existing.documentation && item.documentation) {
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

      // const word = getCurrentWord(textDocument, offset);
      const word = tagInfoStrict.tagName.trim();
      console.log('word', word);
      // const nonEmptyContentRange = getNonEmptyContentRange(textDocument, offset);
      // overwriteRange = undefined;
      for (const item of apidomCompletions) {
        trace('doCompletion - apidomCompletions item', item);
        /*
          see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
          contrary to docs, range must start with the request offset. Workaround is providing
          a filterText with the content of the target range
        */
        // item.filterText = text.substring(location.offset, location.
        // offset + location.length);
        if (word && word.length > 0 && item.insertText?.replace(/^['"]{1}/g, '').startsWith(word)) {
          item.preselect = true;
        }
        // const filterTag = tagInfo.type === 'section' ? tagIn
        if (word && word.length > 0) {
          item.filterText = text.substring(
            tagInfoStrict.tagNameStartIndex!,
            tagInfoStrict.tagNameEndIndex!,
          );
        }

        /*        if (overwriteRange) {
          item.filterText = text.substring(
            textDocument.offsetAt(overwriteRange.start),
            textDocument.offsetAt(overwriteRange.end),
          );
        } */
        if (word && word.length > 0) {
          overwriteRange = Range.create(
            textDocument.positionAt(tagInfoStrict.tagNameStartIndex!),
            textDocument.positionAt(tagInfoStrict.tagNameEndIndex!),
          );
        }

        if (overwriteRange) {
          item.filterText = text.substring(
            textDocument.offsetAt(overwriteRange.start),
            textDocument.offsetAt(overwriteRange.end),
          );
        }
        if (word && word.length > 0) {
          if (enableFiltering && item.insertText?.includes(word)) {
            collector.add(item);
          } else if (!enableFiltering) {
            collector.add(item);
          }
        } else if (!word) {
          collector.add(item);
        }
      }

      /*      if (apidomCompletions) {
        for (const item of apidomCompletions) {
          /!*
            see https://github.com/microsoft/monaco-editor/issues/1889#issuecomment-642809145
            contrary to docs, range must start with the request offset. Workaround is providing
            a filterText with the content of the target range
          *!/
          item.filterText = text.substring(tagInfo.startIndex!, tagInfo.endIndex!);
          collector.add(item);
        }
      } */
    }
    return completionList;
  }

  public async findReferencePointers(
    textDocument: TextDocument,
    doc: Element,
    node: Element,
    docNs: string,
    admitsRefsSiblings: boolean,
    specVersion: string,
    nodeValue: string,
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    yaml: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionItem[]> {
    const result: CompletionItem[] = [];
    // get type of node (element)
    const refElementType = toValue(node.parent?.parent?.getMetaProperty('referenced-element', ''));
    const nodeElement =
      refElementType && refElementType.length > 0 ? refElementType : node.parent?.parent?.element;
    if (!nodeElement) return result;

    const pointers = localReferencePointers(
      doc,
      nodeElement,
      admitsRefsSiblings &&
        completionContext !== undefined &&
        completionContext?.includeIndirectRefs !== undefined &&
        completionContext?.includeIndirectRefs,
    );
    // build completion item
    let i = 97;

    for (const p of pointers) {
      if (p.node !== node.parent?.parent) {
        const valueQuotes = yaml ? "'" : '"';
        const sm = getSourceMap(p.node);
        const item: CompletionItem = {
          label: p.ref,
          insertText: `${valueQuotes}${p.ref}$1${valueQuotes}`,
          kind: 18,
          documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
          // detail: 'DETAIL', // on top of right hand documentation panel
          // labelDetails: {
          // detail: 'LABELDETAILDETAIL', // right after label
          // description: 'local', // right aligned in label panel
          // },
          insertTextFormat: 2,
          sortText: `${String.fromCharCode(i)}`,
        };
        result.push(item);
        i += 1;
      }
    }
    // TODO also add to completion description target fragment so user can preview
    try {
      // TODO (francesco@tumanischvili@smartbear.com)  try using the "repaired" version of the doc (serialize apidom skipping errors and missing)
      for (const provider of this.completionProviders) {
        if (
          provider
            .namespaces()
            .some((ns) => ns.namespace === docNs && ns.version === specVersion) &&
          provider.doRefCompletion &&
          provider.providerMode &&
          provider.providerMode() === ProviderMode.REF
        ) {
          // eslint-disable-next-line no-await-in-loop
          const completionProviderResult = await provider.doRefCompletion(
            textDocument,
            node,
            doc,
            nodeValue,
            nodeElement,
            completionParamsOrPosition,
            result,
            completionContext,
          );
          switch (completionProviderResult.mergeStrategy) {
            case MergeStrategy.APPEND:
              result.push(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.PREPEND:
              result.unshift(...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.REPLACE:
              result.splice(0, result.length, ...completionProviderResult.completionList.items);
              break;
            case MergeStrategy.IGNORE:
              break;
            default:
              result.push(...completionProviderResult.completionList.items);
          }
          if (provider.break()) {
            break;
          }
        }
      }
    } catch (e) {
      console.log('error in validation provider');
    }
    return result;
  }

  private getMetadataPropertyCompletions(
    doc: Element,
    node: Element,
    yaml: boolean,
    docNs: string,
    specVersion: string,
    quotes: string | undefined,
  ): CompletionItem[] {
    debug('getMetadataPropertyCompletions', node.element, yaml, docNs, specVersion, quotes);
    const apidomCompletions: ApidomCompletionItem[] = [];
    let set: string[] = [];
    if (node.classes) {
      set = Array.from(new Set(toValue(node.classes)));
    }
    const referencedElement = toValue(node.getMetaProperty('referenced-element', ''));
    // TODO maybe move to adapter
    if (referencedElement.length > 0 && referencedElement === 'schema') {
      set.unshift('schema');
    }
    set.unshift(node.element);
    set.forEach((s) => {
      debug('getMetadataPropertyCompletions - class', s);
      const classCompletions: ApidomCompletionItem[] = toValue(
        doc.meta.get('metadataMap')?.get(s)?.get('completion'),
      );
      if (classCompletions) {
        apidomCompletions.push(...classCompletions.filter((ci) => !ci.target));
      }
      debug('getMetadataPropertyCompletions - class apidomCompletions', apidomCompletions);
      // check also parent for completions with `target` property
      // get parent
      if (node.parent && isMember(node.parent)) {
        const containerNode = node.parent.parent;
        const key = toValue(node.parent.key);
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(toValue(containerNode.classes)));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = toValue(
            doc.meta.get('metadataMap')?.get(containerNodeSymbol)?.get('completion'),
          );
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => ci.target === key && !ci.arrayMember),
            );
          }
        });
      }
    });
    // check also parent for completions with `target` property and `arrayMember` set to true
    // TODO merge with above, single iteration to retrieve
    if (node.parent && isArray(node.parent)) {
      const arrayParent = node.parent;
      if (arrayParent.parent && isMember(arrayParent.parent)) {
        const containerNode = arrayParent.parent.parent;
        const key = toValue(arrayParent.parent.key);
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(toValue(containerNode.classes)));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = toValue(
            doc.meta.get('metadataMap')?.get(containerNodeSymbol)?.get('completion'),
          );
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => {
                return ci.target === key && ci.arrayMember;
              }),
            );
          }
        });
      }
    }
    /*
      hack for JSON empty array with no quotes:
      ```
      [
        <caret here>
      ]
      ```

      while the following works
      ```
      [
        "<caret here>"
      ]
      ```
      in this case the node from offset is the parent array, so check his parent for completions with `target` property and `arrayMember` set to true
     */
    // TODO merge with above, single iteration to retrieve
    if (!yaml && isArray(node)) {
      if (node.parent && isMember(node.parent)) {
        const containerNode = node.parent.parent;
        const key = toValue(node.parent.key);
        // get metadata of parent with target
        const containerNodeSet: string[] = Array.from(new Set(toValue(containerNode.classes)));
        containerNodeSet.unshift(containerNode.element);
        containerNodeSet.forEach((containerNodeSymbol) => {
          const containerNodeClassCompletions: ApidomCompletionItem[] = toValue(
            doc.meta.get('metadataMap')?.get(containerNodeSymbol)?.get('completion'),
          );
          if (containerNodeClassCompletions) {
            apidomCompletions.push(
              ...containerNodeClassCompletions.filter((ci) => {
                return ci.target === key && ci.arrayMember;
              }),
            );
          }
        });
      }
    }

    // only keep relevant to ns/version
    let filteredCompletions = apidomCompletions.filter(
      (ci) =>
        !ci.targetSpecs ||
        (ci.targetSpecs &&
          ci.targetSpecs.some((nsv) => nsv.namespace === docNs && nsv.version === specVersion)),
    );
    // only keep the ones with satisfied condition
    // TODO single filter traverse
    filteredCompletions = filteredCompletions.filter((ci) => {
      // if target is present pass parent node to check condition
      let element = node;
      if (ci.target && node.parent && isMember(node.parent)) {
        element = node.parent.parent;
      }
      return checkConditions(ci, docNs, element, doc, this.settings);
    });
    // build insert text
    // TODO refactor code branches
    // TODO add flag as user preference for quotes for yaml, and use it
    const customCompletionItems: CompletionItem[] = [];
    for (const item of filteredCompletions) {
      if (item.function) {
        const funcName = item.function;
        // first check if it is a standard function and exists.
        let func = standardLinterfunctions.find((e) => e.functionName === funcName)?.function;
        // else get it from configuration
        if (!func) {
          func = this.settings?.metadata?.linterFunctions[docNs][funcName];
        }
        if (func) {
          try {
            let lintRes: CompletionItem[] | boolean | undefined = [];
            const targetElement =
              item.target && item.target.length > 0 && isObject(node)
                ? node.hasKey(item.target)
                  ? node.get(item.target)
                  : node
                : node;

            if (
              item.functionParams &&
              Array.isArray(item.functionParams) &&
              item.functionParams.length > 0
            ) {
              const params = [targetElement].concat(item.functionParams);
              lintRes = func(...params);
            } else {
              lintRes = func(targetElement);
            }
            if (lintRes) {
              customCompletionItems.push(...(lintRes as CompletionItem[]));
              for (const customItem of customCompletionItems) {
                DefaultCompletionService.style(customItem, item, yaml, quotes);
              }
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('completion function error', JSON.stringify(e), e);
          }
          item.label = DefaultCompletionService.DELETEME;
        }
      } else {
        DefaultCompletionService.style(item, item, yaml, quotes);
      }
      delete item.type;
      delete item.format;
      delete item.function;
      delete item.functionParams;
    }
    filteredCompletions = filteredCompletions.filter(
      (ci) => ci.label !== DefaultCompletionService.DELETEME,
    );
    filteredCompletions.push(...customCompletionItems);
    return filteredCompletions as CompletionItem[];
  }

  private static style(
    targetItem: CompletionItem,
    definedItem: ApidomCompletionItem,
    yaml: boolean,
    quotes?: string,
  ): void {
    switch (definedItem.type) {
      case CompletionType.VALUE:
        switch (definedItem.format) {
          case CompletionFormat.OBJECT:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `{\n  "${targetItem.insertText}": $1\n}`;
            }
            break;
          case CompletionFormat.ARRAY:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  - ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `[\n  "${targetItem.insertText}": $1\n]`;
            }
            break;
          case CompletionFormat.ARRAY_OBJECT:
            if (yaml) {
              if (quotes) {
                // if we are in YAML within quotes this shouldn't happen, leave as is
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `\n  - ${targetItem.insertText}: $1`;
              }
            } else if (quotes) {
              // if we are in JSON within quotes this shouldn't happen, leave as is
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `[\n  "${targetItem.insertText}": {\n  $1\n}\n]`;
            }
            break;
          case CompletionFormat.QUOTED:
            if (yaml) {
              if (quotes) {
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `${targetItem.insertText}$1`;
              }
            } else if (quotes) {
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}"$1`;
            }
            break;
          case CompletionFormat.UNQUOTED:
            if (yaml) {
              if (quotes) {
                // shouldn't happen
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `${targetItem.insertText}$1`;
              }
            } else if (quotes) {
              // shouldn't happen
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `${targetItem.insertText}$1`;
            }
            break;
          case CompletionFormat.QUOTED_FORCED:
            if (yaml) {
              if (quotes) {
                // shouldn't happen
                targetItem.insertText = `${targetItem.insertText}$1`;
              } else {
                targetItem.insertText = `'${targetItem.insertText}$1'`;
              }
            } else if (quotes) {
              targetItem.insertText = `${targetItem.insertText}$1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}"$1`;
            }
            break;
          default:
          //
        }
        break;
      case CompletionType.PROPERTY:
        switch (definedItem.format) {
          case CompletionFormat.OBJECT:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": {\n  $1\n}`;
            }
            break;
          case CompletionFormat.ARRAY:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  - $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": [\n  $1\n]`;
            }
            break;
          case CompletionFormat.ARRAY_OBJECT:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: \n  - $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": [\n  {\n  $1\n}\n]`;
            }
            break;
          case CompletionFormat.QUOTED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": "$1"`;
            }
            break;
          case CompletionFormat.UNQUOTED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: $1`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": $1`;
            }
            break;
          case CompletionFormat.QUOTED_FORCED:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}: '$1'`;
            } else {
              targetItem.insertText = `"${targetItem.insertText}": "$1"`;
            }
            break;
          case CompletionFormat.PARTIAL_KEY:
            if (yaml) {
              targetItem.insertText = `${targetItem.insertText}$1: `;
            } else {
              targetItem.insertText = `"${targetItem.insertText}$1": `;
            }
            break;
          case CompletionFormat.PARTIAL_KEY_QUOTED:
            if (yaml) {
              targetItem.insertText = `'${targetItem.insertText}$1': `;
            } else {
              targetItem.insertText = `"${targetItem.insertText}$1": `;
            }
            break;
          default:
          //
        }
        break;
      default:
      //
    }
  }
}
