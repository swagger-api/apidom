/* eslint-disable no-plusplus */
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  SemanticTokens,
  SemanticTokensLegend,
  SemanticTokenModifiers,
} from 'vscode-languageserver-protocol';
import {
  Element,
  isBooleanElement,
  isNumberElement,
  isStringElement,
  traverse,
} from '@swagger-api/apidom-core';

import { LanguageSettings } from '../../apidom-language-types';
import {
  SourceMap,
  getSourceMap,
  isMember,
  correctPartialKeys,
  perfEnd,
  perfStart,
  isJsonDoc,
} from '../../utils/utils';

enum PerfLabels {
  START = 'computeSemanticTokens',
}

export interface SemanticTokensService {
  computeSemanticTokens(textDocument: TextDocument): Promise<SemanticTokens>;

  configure(settings?: LanguageSettings): void;

  getLegend(): SemanticTokensLegend;
}

export class DefaultSemanticTokensService implements SemanticTokensService {
  private settings: LanguageSettings | undefined;

  static legend: SemanticTokensLegend;

  static tokenTypes: { [key: string]: number } = {};

  static tokenModifiers: { [key: string]: number } = {};

  // TODO REMOVE!
  private static allClasses(): string[] {
    return [
      'parameter',
      'api-version',
      'spec-version',
      'specVersion',
      'info',
      'operation',
      'pathItem',
      'components',
      'components-parameters',
      'components-schemas',
      'openapi-reference',
      'server-url',
      'Asyncapi-reference',
      'json-reference',
      'content',
      'mediaType',
      'openapi',
      'parameters',
      'paths',
      'reference',
      'requestBody',
      'response',
      'responses',
      'schema',
      'server',
      'servers',
      'title',
      'channelItem',
      'channels',
      'reference-element',
      'reference-value',
      'components-messages',
    ];
  }

  private static _initialize: void = ((): void => {
    let tokenIndex = 0;
    for (const entry of DefaultSemanticTokensService.allClasses()) {
      DefaultSemanticTokensService.tokenTypes[entry] = tokenIndex++;
    }
    DefaultSemanticTokensService.tokenTypes.value = tokenIndex++;
    DefaultSemanticTokensService.tokenTypes.string = tokenIndex++;
    DefaultSemanticTokensService.tokenTypes.number = tokenIndex++;
    DefaultSemanticTokensService.tokenTypes.key = tokenIndex++;

    DefaultSemanticTokensService.tokenModifiers[SemanticTokenModifiers.declaration] = 1;
    DefaultSemanticTokensService.tokenModifiers[SemanticTokenModifiers.definition] = 2;
    DefaultSemanticTokensService.tokenModifiers[SemanticTokenModifiers.deprecated] = 4;
    DefaultSemanticTokensService.tokenModifiers.reference = 8;
    DefaultSemanticTokensService.tokenModifiers['httpMethod-GET'] = 16;
    DefaultSemanticTokensService.tokenModifiers['httpMethod-POST'] = 32;
    DefaultSemanticTokensService.tokenModifiers.string = 64;
    DefaultSemanticTokensService.tokenModifiers.number = 128;

    const legendTokenTypes = Object.keys(DefaultSemanticTokensService.tokenTypes);
    const legendTokenModifiers = Object.keys(DefaultSemanticTokensService.tokenModifiers);

    DefaultSemanticTokensService.legend = {
      tokenTypes: legendTokenTypes,
      tokenModifiers: legendTokenModifiers,
    };
  })();

  static getTokenType(type: string): number {
    return DefaultSemanticTokensService.tokenTypes[type];
  }

  static getTokenModifiers(modifiers: string[]): number {
    let bit = 0;
    for (const modifier of modifiers) {
      // eslint-disable-next-line no-bitwise
      bit |= DefaultSemanticTokensService.tokenModifiers[modifier];
    }
    return bit;
  }

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public getLegend(): SemanticTokensLegend {
    return DefaultSemanticTokensService.legend;
  }

  // eslint-disable-next-line class-methods-use-this
  public async computeSemanticTokens(textDocument: TextDocument): Promise<SemanticTokens> {
    perfStart(PerfLabels.START);
    const tokens: number[][] = [];

    let result = await this.settings!.documentCache?.get(
      textDocument,
      undefined,
      'computeSemanticTokens-parse-first',
    );
    if (!result) {
      return {
        data: tokens.flat(),
      } as SemanticTokens;
    }
    const isJson = isJsonDoc(textDocument);
    let processedText;
    if (result.annotations && !isJson) {
      processedText = correctPartialKeys(result, textDocument, isJson);
    }
    if (processedText) {
      result = await this.settings!.documentCache?.get(
        textDocument,
        processedText,
        'computeSemanticTokens-parse-second',
      );
    }
    if (!result) {
      return {
        data: tokens.flat(),
      } as SemanticTokens;
    }

    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined)
      return {
        data: tokens.flat(),
      } as SemanticTokens;

    let lastLine = 0;
    let lastColumn = 0;

    const processed: Element[] = [];

    const buildTokens = (element: Element) => {
      /*

const smt = getSourceMap(element);
console.log(
  '[buildTokens]',
  `[${smt.line}:${smt.column}]`,
  `[el:${element.element}]`,
  `[val:${JSON.stringify(element.toValue())}]`,
);
*/
      let foundClasses = false;
      let parentNode = false;

      // TODO (francesco.tumanischvili@smartbear.com) De-duplicate code
      let set: string[] = [];
      if (element.classes) {
        set = Array.from(new Set(element.classes.toValue()));
      }
      // add element value to the set (e.g. 'pathItem', 'operation')
      set.unshift(element.element);
      // remove duplicates
      set = Array.from(new Set(set));
      // if it's a 'reference-element' or a `reference-value' process it first
      if (set.includes('reference-element')) {
        const clz = 'reference-element';
        let sm: SourceMap;
        if (element.parent && isMember(element.parent)) {
          sm = getSourceMap(element.parent.key as Element);
          parentNode = true;
          processed.push(element.parent.key as Element);
        } else {
          sm = getSourceMap(element);
          processed.push(element);
        }
        // only process single line non objects/arrays until full multiline and overlapping supported by
        // the client. Check client capabilities
        if (
          isStringElement(element) ||
          isNumberElement(element) ||
          isBooleanElement(element) ||
          parentNode
        ) {
          const modifier = 0;
          const token = [
            sm.line - lastLine,
            sm.line === lastLine ? sm.column - lastColumn : sm.column,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            sm.endOffset! - sm.offset,
            DefaultSemanticTokensService.getTokenType(clz),
            modifier,
          ];

          /*
          console.log(
            '[token]',
            `[${sm.line}:${sm.column}]`,
            `[el:${clz}]`,
            `[lastLine:${lastLine}]`,
            `[lastColumn:${lastColumn}]`,
            `[+l:${token[0]}]`,
            `[+c:${token[1]}]`,
            `[len:${token[2]}]`,
            `[id:${token[3]}]`,
          );
*/

          tokens.push(token);
          lastLine = sm.line;
          lastColumn = sm.column;
        }
      } else if (set.includes('reference-value')) {
        const clz = 'reference-value';
        const sm = getSourceMap(element);
        processed.push(element);
        // only process single line non objects/arrays until full multiline and overlapping supported by
        // the client. Check client capabilities
        if (
          isStringElement(element) ||
          isNumberElement(element) ||
          isBooleanElement(element) ||
          parentNode
        ) {
          const modifier = 0;
          const token = [
            sm.line - lastLine,
            sm.line === lastLine ? sm.column - lastColumn : sm.column,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            sm.endOffset! - sm.offset,
            DefaultSemanticTokensService.getTokenType(clz),
            modifier,
          ];

          /*
          console.log(
            '[token]',
            `[${sm.line}:${sm.column}]`,
            `[el:${clz}]`,
            `[lastLine:${lastLine}]`,
            `[lastColumn:${lastColumn}]`,
            `[+l:${token[0]}]`,
            `[+c:${token[1]}]`,
            `[len:${token[2]}]`,
            `[id:${token[3]}]`,
          );
*/

          tokens.push(token);
          lastLine = sm.line;
          lastColumn = sm.column;
        }
      } else {
        set.forEach((s) => {
          if (
            DefaultSemanticTokensService.allClasses().includes(s) &&
            !processed.includes(element)
          ) {
            foundClasses = true;
            let sm: SourceMap;
            if (element.parent && isMember(element.parent)) {
              sm = getSourceMap(element.parent.key as Element);
              parentNode = true;
              processed.push(element.parent.key as Element);
            } else {
              sm = getSourceMap(element);
              processed.push(element);
            }
            // only process single line non objects/arrays until full multiline and overlapping supported by
            // the client. Check client capabilities
            if (
              isStringElement(element) ||
              isNumberElement(element) ||
              isBooleanElement(element) ||
              parentNode
            ) {
              let modifier = 0;
              if (s === 'operation') {
                // check for httpMethod
                modifier = DefaultSemanticTokensService.getTokenModifiers([
                  `httpMethod-${element.getMetaProperty('http-method', 'GET').toValue()}`,
                ]);
              }
              const token = [
                sm.line - lastLine,
                sm.line === lastLine ? sm.column - lastColumn : sm.column,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sm.endOffset! - sm.offset,
                DefaultSemanticTokensService.getTokenType(s),
                modifier,
              ];

              /*
              console.log(
                '[token]',
                `[${sm.line}:${sm.column}]`,
                `[el:${s}]`,
                `[lastLine:${lastLine}]`,
                `[lastColumn:${lastColumn}]`,
                `[+l:${token[0]}]`,
                `[+c:${token[1]}]`,
                `[len:${token[2]}]`,
                `[id:${token[3]}]`,
              );
*/

              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;
            }
          }
        });
        if (!processed.includes(element) && (!foundClasses || parentNode)) {
          let hasSignificantValue = false;
          if (element.parent && isMember(element.parent)) {
            const val = <Element>element.parent.value;
            let valueClasses: string[] = [];
            if (val.classes) {
              valueClasses = Array.from(new Set(val.classes.toValue()));
            }
            // add element value to the set (e.g. 'pathItem', 'operation')
            valueClasses.unshift(val.element);
            valueClasses = Array.from(new Set(valueClasses));
            for (const c of valueClasses) {
              if (DefaultSemanticTokensService.allClasses().includes(c)) {
                hasSignificantValue = true;
                break;
              }
            }
          }
          if (!hasSignificantValue && (isStringElement(element) || isNumberElement(element))) {
            const sm: SourceMap = getSourceMap(element);
            let token;
            if (element.parent && isMember(element.parent) && element.parent.value === element) {
              // this is a value
              token = [
                sm.line - lastLine,
                sm.line === lastLine ? sm.column - lastColumn : sm.column,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sm.endOffset! - sm.offset,
                DefaultSemanticTokensService.getTokenType('value'),
                DefaultSemanticTokensService.getTokenModifiers(
                  isStringElement(element) ? ['string'] : ['number'],
                ),
              ];

              /*
              console.log(
                '[token el]',
                `[${sm.line}:${sm.column}]`,
                `[el:${isStringElement(element) ? 'string' : 'number'}]`,
                `[lastLine:${lastLine}]`,
                `[lastColumn:${lastColumn}]`,
                `[+l:${token[0]}]`,
                `[+c:${token[1]}]`,
                `[len:${token[2]}]`,
                `[id:${token[3]}]`,
              );
*/

              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;
            } else if (
              element.parent &&
              isMember(element.parent) &&
              element.parent.key === element
            ) {
              // just a string or number
              token = [
                sm.line - lastLine,
                sm.line === lastLine ? sm.column - lastColumn : sm.column,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sm.endOffset! - sm.offset,
                DefaultSemanticTokensService.getTokenType('key'),
                DefaultSemanticTokensService.getTokenModifiers(
                  isStringElement(element) ? ['string'] : ['number'],
                ),
              ];

              /*
              console.log(
                '[token KEY]',
                `[${sm.line}:${sm.column}]`,
                `[el:${isStringElement(element) ? 'string' : 'number'}]`,
                `[lastLine:${lastLine}]`,
                `[lastColumn:${lastColumn}]`,
                `[+l:${token[0]}]`,
                `[+c:${token[1]}]`,
                `[len:${token[2]}]`,
                `[id:${token[3]}]`,
              );
*/

              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;
            }
          }
        }
      }
    };

    traverse(buildTokens, api);
    perfEnd(PerfLabels.START);
    return {
      data: tokens.flat(),
    } as SemanticTokens;
  }
}
