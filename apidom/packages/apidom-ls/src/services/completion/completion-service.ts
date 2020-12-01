import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  isMemberElement,
  isNullElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
} from 'apidom';
import { LanguageSettings, CompletionContext } from '../../apidom-language-types';
import { addMetadataMapping, getSourceMap, isMember, isObject } from '../../utils/utils';
import { getParser, isJsonDoc } from '../../parser-factory';

export interface CompletionsCollector {
  add(suggestion: unknown): void;
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

  public doCompletion(
    textDocument: TextDocument,
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
        let endObjectNodeChar = '\n';
        let endArrayNodeChar = '\n';

        // TODO handle also yaml and others, with specific logic for the format
        if (isJsonDoc(textDocument)) {
          // commit chars for json
          valueCommitCharacters = [',', '}', ']'];
          propertyCommitCharacters = [':'];
          endObjectNodeChar = '}';
          endArrayNodeChar = ']';
        }
        if (node && offset === sm.offset + sm.length && offset > 0) {
          const ch = text[offset - 1];
          if (
            (isObjectElement(node) && ch === endObjectNodeChar) ||
            (isArrayElement(node) && ch === endArrayNodeChar)
          ) {
            // after ] or }
            node = node.parent;
          }
        }

        sm = getSourceMap(node);
        const currentWord = DefaultCompletionService.getCurrentWord(textDocument, offset);
        let overwriteRange: Range;

        if (
          node &&
          (isStringElement(node) ||
            isNumberElement(node) ||
            isBooleanElement(node) ||
            isNullElement(node))
        ) {
          overwriteRange = Range.create(
            textDocument.positionAt(sm.offset),
            textDocument.positionAt(sm.offset + sm.length),
          );
        } else {
          let overwriteStart = offset - currentWord.length;
          if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
            overwriteStart -= 1;
          }
          overwriteRange = Range.create(
            textDocument.positionAt(overwriteStart),
            completionParams.position,
          );
        }
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

        let addValue = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let currentKey = '';

        let currentProperty: Element | null = null;
        if (node) {
          if (isStringElement(node)) {
            const { parent } = node;
            // if (parent && isElementOfType(parent, isMemberElement) && parent.key === node) {
            // TODO replace with above when fixed in ts compiler
            if (parent && isMember(parent) && parent.key === node) {
              addValue = !parent.value;
              currentProperty = parent;
              currentKey = text.substr(sm.offset + 1, sm.length - 2);

              if (parent) {
                node = parent.parent;
              }
            }
          } else if (isMemberElement(node)) {
            const { parent } = node;
            if (parent) {
              node = parent;
            }
          }
        }
        if (node) {
          sm = getSourceMap(node);
        }

        // proposals for properties
        // don't suggest keys when the cursor is just before the opening curly brace
        // TODO YAML

        // if (node && isElementOfType(node, isObjectElement) && !(sm.offset === offset)) {
        // TODO replace with above when fixed in ts compiler
        if (node && isObject(node) && !(sm.offset === offset)) {
          if (sm.offset !== offset) {
            // don't suggest properties that are already present
            for (const p of node) {
              if (!currentProperty || currentProperty !== p) {
                proposed[p.key.toValue()] = CompletionItem.create('__');
              }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            // TODO
            /*             if (
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
 */
          }
        }

        // proposals for values TODO
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
        }
      }

      this.jsonSchemaCompletionService
        .doCompletion(textDocument, completionParams, completionContext)
        .then((schemaList) => {
          completionList.items.push(...schemaList.items);
        });

      return completionList;
    });
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
    }
  }
}
