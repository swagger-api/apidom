/* eslint-disable no-console */
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  InsertTextFormat,
  Range,
  TextEdit,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionParams } from 'vscode-languageserver-protocol';
import {
  Element,
  findAtOffset,
  isArrayElement,
  isBooleanElement,
  isMember,
  isNullElement,
  isNumberElement,
  isObject,
  isObjectElement,
  isStringElement,
} from 'apidom';
import { LanguageSettings, CompletionContext } from '../../apidomLanguageTypes';
import { addMetadataMapping, getSourceMap } from '../../utils/utils';
import { getParser, isJsonDoc } from '../../parserFactory';

export interface CompletionsCollector {
  add(suggestion: any): void;
  setAsIncomplete(): void;
  getNumberOfProposals(): number;
}

export interface CompletionService {
  doCompletion(
    textDocument: TextDocument,
    completionParams: CompletionParams,
    completionContext?: CompletionContext,
  ): PromiseLike<CompletionList>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultCompletionService implements CompletionService {
  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService;

  public constructor(jsonSchemaCompletionService: CompletionService) {
    this.jsonSchemaCompletionService = jsonSchemaCompletionService;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  private static getCurrentWord(document: TextDocument, offset: number) {
    let i = offset - 1;
    const text = document.getText();
    while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
      i -= 1;
    }
    return text.substring(i + 1, offset);
  }

  // eslint-disable-next-line class-methods-use-this
  public doCompletion(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParams: CompletionParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): PromiseLike<CompletionList> {
    // get right parser
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    const schema = false;

    // parse
    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // if we cannot parse nothing to do
      if (!api) {
        return CompletionList.create();
      }
      // use the type related metadata at root level
      addMetadataMapping(api); // TODO move to parser/adapter, extending the one standard
      api.freeze(); // !! freeze and add parent !!

      const completionList: CompletionList = {
        items: [],
        isIncomplete: false,
      };

      // const completionItems: CompletionItem[] = [];

      const offset = textDocument.offsetAt(completionParams.position);
      // find the current node
      let node = findAtOffset({ offset, includeRightBound: true }, api);

      // only if we have a node
      // TODO add jsonSchema completion, see experiments/apidom-monaco and vscode-json-languageservice
      if (node) {
        let sm = getSourceMap(node);

        // commit chars for yaml
        let valueCommitCharacters = ['\n'];
        let propertyCommitCharacters = [':'];

        // don't suggest keys when the cursor is just before the opening curly brace
        // TODO handle also yaml and others, with specific logic for the format
        if (isJsonDoc(textDocument)) {
          // commit chars for json
          valueCommitCharacters = [',', '}', ']'];
          propertyCommitCharacters = [':'];

          if (node && offset === sm.offset + sm.length && offset > 0) {
            const ch = text[offset - 1];
            if ((isObjectElement(node) && ch === '}') || (isArrayElement(node) && ch === ']')) {
              // after ] or }
              node = node.parent;
            }
          }
        }

        sm = getSourceMap(node);
        const currentWord = DefaultCompletionService.getCurrentWord(textDocument, offset);
        console.log('current word', currentWord);
        let overwriteRange: Range;

        if (
          node &&
          (isStringElement(node) ||
            isNumberElement(node) ||
            isBooleanElement(node) ||
            isNullElement(node))
        ) {
          console.log('isStringElement');
          overwriteRange = Range.create(
            textDocument.positionAt(sm.offset),
            textDocument.positionAt(sm.offset + sm.length),
          );
        } else {
          console.log('no prim');
          let overwriteStart = offset - currentWord.length;
          if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
            overwriteStart -= 1;
          }
          overwriteRange = Range.create(
            textDocument.positionAt(overwriteStart),
            completionParams.position,
          );
        }
        console.log('overwriteRange', overwriteRange);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const supportsCommitCharacters = false; // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

        const proposed: { [key: string]: CompletionItem } = {};

        const collector: CompletionsCollector = {
          add: (suggestion: CompletionItem) => {
            console.log('add', overwriteRange);
            const item: CompletionItem = JSON.parse(JSON.stringify(suggestion));
            let { label } = item;
            const existing = proposed[label];
            console.log('existing', existing);
            console.log('label', label);
            if (!existing) {
              label = label.replace(/[\n]/g, '↵');
              if (label.length > 60) {
                const shortendedLabel = `${label.substr(0, 57).trim()}...`;
                if (!proposed[shortendedLabel]) {
                  label = shortendedLabel;
                }
              }
              if (overwriteRange) {
                console.log('SET');
                item.textEdit = TextEdit.replace(overwriteRange, item.insertText || '');
                console.log('SET', item.textEdit);
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

        let addValue = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let currentKey = '';

        let currentProperty: Element | null = null;
        if (node) {
          if (isStringElement(node)) {
            const { parent } = node;
            if (parent && isMember(parent) && parent.key === node) {
              addValue = !parent.value;
              currentProperty = parent;
              currentKey = text.substr(sm.offset + 1, sm.length - 2);

              if (parent) {
                node = parent.parent;
              }
            }
          }
        }
        if (node) {
          sm = getSourceMap(node);
        }

        // proposals for properties
        // don't suggest keys when the cursor is just before the opening curly brace
        // TODO YAML
        if (node && isObject(node) && !(sm.offset === offset)) {
          if (sm.offset !== offset) {
            // don't suggest properties that are already present
            for (const p of node) {
              if (!currentProperty || currentProperty !== p) {
                proposed[p.key.toValue()] = CompletionItem.create('__');
              }
            }
            let separatorAfter = '';
            if (addValue) {
              separatorAfter = DefaultCompletionService.evaluateSeparatorAfter(
                textDocument,
                textDocument.offsetAt(overwriteRange.end),
              );
            }

            if (schema) {
              // DefaultCompletionService.getPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
            } else {
              DefaultCompletionService.getSchemaLessPropertyCompletions(api, node, collector);
            }

            if (
              !schema &&
              currentWord.length > 0 &&
              text.charAt(offset - currentWord.length - 1) !== '"'
            ) {
              collector.add({
                kind: CompletionItemKind.Property,
                label: currentWord,
                insertText: DefaultCompletionService.getInsertTextForProperty(
                  currentWord,
                  false,
                  separatorAfter,
                ),
                insertTextFormat: InsertTextFormat.Snippet,
                documentation: '',
              });
              collector.setAsIncomplete();
            }
          }
        }

        // proposals for values
        // const types: { [type: string]: boolean } = {};
        if (schema) {
          // value proposals with schema
          // this.getValueCompletions(schema, api, node, offset, document, collector, types);
        } else {
          // value proposals without schema
          // this.getSchemaLessValueCompletions(api, node, offset, document, collector);
        }

        if (node) {
          sm = getSourceMap(node);
        }
        if (collector.getNumberOfProposals() === 0) {
          let offsetForSeparator = offset;

          if (
            node &&
            (isStringElement(node) ||
              isNumberElement(node) ||
              isBooleanElement(node) ||
              isNullElement(node))
          ) {
            offsetForSeparator = sm.offset + sm.length;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const separatorAfter = DefaultCompletionService.evaluateSeparatorAfter(
            textDocument,
            offsetForSeparator,
          );
          /*           DefaultCompletionService.addFillerValueCompletions(
            types,
            separatorAfter,
            isJsonDoc(textDocument),
            collector,
          ); */
        }
      }
      // return CompletionList.create(completionItems, false);

      // add my completions
      /*       const item: CompletionItem = {
        kind: CompletionItemKind.Property,
        label: 'test1',
        insertText: 'getInsertTextForProperty1',
        insertTextFormat: InsertTextFormat.Snippet,
        filterText: 'getFilterTextForValue1',
        documentation: 'documentation1',
      };

      completionItems.push(item);

      this.jsonSchemaCompletionService
        .doCompletion(textDocument, completionParams, completionContext)
        .then((schemaList) => {
          completionItems.push(...schemaList.items);
        });
      completionList.items.push(...completionItems);
 */

      return completionList;
      // return Promise.resolve(CompletionList.create());
    });
  }

  private static getInsertTextForPlainText(text: string): string {
    // eslint-disable-next-line no-useless-escape
    return text.replace(/[\\\$\}]/g, '\\$&'); // escape $, \ and }
  }

  private static getInsertTextForValue(value: any, separatorAfter: string): string {
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

  private static getSchemaLessPropertyCompletions(
    doc: Element,
    node: Element,
    collector: CompletionsCollector,
  ): void {
    const apidomCompletions: CompletionItem[] = doc.meta
      .get('metadataMap')
      ?.get(node.element)
      ?.get('completion')
      ?.toValue();
    if (apidomCompletions) {
      for (const item of apidomCompletions) {
        collector.add(item);
      }

      // completionItems.push(...apidomCompletions);
    }
  }

  /*   private addFillerValueCompletions(
    types: { [type: string]: boolean },
    separatorAfter: string,
    isJson: boolean,
    collector: CompletionsCollector,
  ): void {
    if (types.object) {
      collector.add({
        kind: CompletionItemKind.Property,
        label: isJson ? '{}' : '',
        insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
        insertTextFormat: InsertTextFormat.Snippet,
        detail: localize('defaults.object', 'New object'),
        documentation: '',
      });
    }
    if (types.array) {
      collector.add({
        kind: this.getSuggestionKind('array'),
        label: '[]',
        insertText: this.getInsertTextForGuessedValue([], separatorAfter),
        insertTextFormat: InsertTextFormat.Snippet,
        detail: localize('defaults.array', 'New array'),
        documentation: '',
      });
    }
  } */
}
