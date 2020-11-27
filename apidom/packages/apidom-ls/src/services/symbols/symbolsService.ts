/* eslint-disable no-console */
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Range, SymbolInformation } from 'vscode-languageserver-protocol';
import { ArraySlice, Element, filter, isMember, MemberElement } from 'apidom';
import { SymbolKind } from 'vscode-languageserver-types';
import { getParser } from '../../parserFactory';
import { addMetadataMapping, getSourceMap, SourceMap } from '../../utils/utils';
import { LanguageSettings, SymbolsContext } from '../../apidomLanguageTypes';

export interface SymbolsService {
  doFindDocumentSymbols(
    document: TextDocument,
    context?: SymbolsContext,
  ): PromiseLike<SymbolInformation[]>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultSymbolsService implements SymbolsService {
  private settings: LanguageSettings | undefined;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public doFindDocumentSymbols(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context?: SymbolsContext,
  ): PromiseLike<SymbolInformation[]> {
    // TODO use added metadata instead of classes and stuff

    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    // parse
    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // if we cannot parse nothing to do
      if (!api) {
        return [];
      }
      // use the type related metadata at root level
      addMetadataMapping(api); // TODO move to parser/adapter, extending the one standard
      api.freeze(); // !! freeze and add parent !!

      const symbols: SymbolInformation[] = [];

      // TODO remove
      const allClasses = [
        'info',
        'version',
        'specVersion',
        'license',
        'operation',
        'pathItem',
        'httpMethod',
      ];

      const res: ArraySlice = filter((el: Element) => {
        return el.classes.toValue().some((item: string) => allClasses.includes(item));
      }, api);

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < res.length; ++index) {
        const e = res.get(index);
        const set: string[] = Array.from(new Set(e.classes.toValue()));
        set.forEach((s) => {
          if (allClasses.includes(s)) {
            let sm: SourceMap;
            if (e.parent && isMember(e.parent) && e.parent.key) {
              sm = getSourceMap(e.parent.key as Element);
            } else {
              sm = getSourceMap(e);
            }
            const r = Range.create(
              { line: sm.line, character: sm.column },
              { line: sm.endLine || sm.line, character: sm.endColumn || sm.column },
            );

            // cheat now here for demo
            if (s === 'operation') {
              const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
              // TODO solve this
              const superParent: MemberElement = e.parent.parent.parent as MemberElement;
              const keySuper = superParent.key as Element;
              const keyValueSuper = keySuper.toValue() as string;
              const parent: MemberElement = e.parent as MemberElement;
              const key = parent.key as Element;
              const keyValue = key.toValue() as string;
              si.containerName = `${keyValueSuper} -> ${keyValue}`;
              symbols.push(si);
            } else if (s === 'pathItem') {
              const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
              const parent: MemberElement = e.parent as MemberElement;
              const key = parent.key as Element;
              const keyValue = key.toValue() as string;
              si.containerName = keyValue;
              symbols.push(si);
            } else {
              symbols.push(SymbolInformation.create(s, SymbolKind.Property, r));
            }
          }
        });
      }
      return symbols;
    });
  }
}
