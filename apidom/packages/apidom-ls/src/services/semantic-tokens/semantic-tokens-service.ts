import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  SemanticTokens,
  SemanticTokensLegend,
  SemanticTokenTypes,
  SemanticTokenModifiers,
} from 'vscode-languageserver-protocol';
import { Element, isNumberElement, isStringElement, traverse } from 'apidom';

import { LanguageSettings } from '../../apidom-language-types';
import { SourceMap, getSourceMap, isMember, setMetadataMap } from '../../utils/utils';
import { getParser, isAsyncDoc } from '../../parser-factory';

export interface SemanticTokensService {
  computeSemanticTokens(textDocument: TextDocument): PromiseLike<SemanticTokens>;

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
    return ['info', 'version', 'specVersion', 'license', 'operation', 'pathItem', 'httpMethod'];
  }

  private static _initialize: void = ((): void => {
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.keyword] = 0;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.comment] = 1;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.parameter] = 2;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.property] = 3;
    DefaultSemanticTokensService.tokenTypes.label = 4;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.class] = 5;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.macro] = 6;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.string] = 7;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.variable] = 8;
    DefaultSemanticTokensService.tokenTypes[SemanticTokenTypes.operator] = 9;
    DefaultSemanticTokensService.tokenTypes.specVersion = 10;
    DefaultSemanticTokensService.tokenTypes.version = 11;
    DefaultSemanticTokensService.tokenTypes.info = 12;
    DefaultSemanticTokensService.tokenTypes.operation = 13;
    DefaultSemanticTokensService.tokenTypes.pathItem = 14;
    DefaultSemanticTokensService.tokenTypes.key = 15;
    DefaultSemanticTokensService.tokenTypes.value = 16;
    DefaultSemanticTokensService.tokenTypes.number = 17;

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
  computeSemanticTokens(textDocument: TextDocument): PromiseLike<SemanticTokens> {
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    const tokens: number[][] = [];

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // if we cannot parse nothing to do
      if (!api) {
        return {
          data: tokens.flat(),
        } as SemanticTokens;
      }
      // TODO use the type related metadata at root level defining the tokenTypes and modifiers
      setMetadataMap(
        api,
        isAsyncDoc(text) ? 'asyncapi' : 'openapi',
        this.settings?.metadata?.metadataMaps,
      ); // TODO move to parser/adapter, extending the one standard
      api.freeze(); // !! freeze and add parent !!

      let lastLine = 0;
      let lastColumn = 0;

      const processed: Element[] = [];

      const buildTokens = (element: Element) => {
        let foundClasses = false;
        let parentNode = false;

        if (element.classes) {
          const set: string[] = Array.from(new Set(element.classes.toValue()));
          // add element value to the set (e.g. 'pathItem', 'operation'
          set.unshift(element.element);
          set.unshift('*');
          set.forEach((s) => {
            if (DefaultSemanticTokensService.allClasses().includes(s)) {
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
              let modifier = 0;
              if (s === 'operation') {
                // check for httpMethod
                modifier = DefaultSemanticTokensService.getTokenModifiers([
                  `httpMethod-${element.getMetaProperty('httpMethod', 'GET').toValue()}`,
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
              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;
            }
          });
        }
        if (!processed.includes(element) && (!foundClasses || parentNode)) {
          if (isStringElement(element) || isNumberElement(element)) {
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
              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;

              // } else {
            } else if (
              !(element.parent && isMember(element.parent) && element.parent.key === element)
            ) {
              // just a string or number
              token = [
                sm.line - lastLine,
                sm.line === lastLine ? sm.column - lastColumn : sm.column,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                sm.endOffset! - sm.offset,
                DefaultSemanticTokensService.getTokenType(
                  isStringElement(element) ? 'string' : 'number',
                ),
                0,
              ];
              tokens.push(token);
              lastLine = sm.line;
              lastColumn = sm.column;
            }
          }
        }
      };

      traverse(buildTokens, api);

      return {
        data: tokens.flat(),
      } as SemanticTokens;
    });
  }
}
