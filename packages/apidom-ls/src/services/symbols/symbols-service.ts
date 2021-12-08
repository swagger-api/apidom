/* eslint-disable no-console */
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Range, SymbolInformation } from 'vscode-languageserver-protocol';
import { ArraySlice, Element, filter, MemberElement } from '@swagger-api/apidom-core';
import { SymbolKind } from 'vscode-languageserver-types';

import { buildPath, getSourceMap, isMember, SourceMap } from '../../utils/utils';
import { LanguageSettings, SymbolsContext } from '../../apidom-language-types';

export interface SymbolsService {
  doFindDocumentSymbols(
    document: TextDocument,
    context?: SymbolsContext,
  ): Promise<SymbolInformation[]>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultSymbolsService implements SymbolsService {
  private settings: LanguageSettings | undefined;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public async doFindDocumentSymbols(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context?: SymbolsContext,
  ): Promise<SymbolInformation[]> {
    // TODO use added metadata instead of classes and stuff

    const result = await this.settings!.documentCache?.get(textDocument);
    if (!result) return [];
    const { api } = result;
    // if we cannot parse nothing to do
    if (api === undefined) return [];

    const symbols: SymbolInformation[] = [];

    // TODO remove
    const allClasses = [
      'info',
      'api-version',
      'spec-version',
      'specVersion',
      'license',
      'operation',
      'pathItem',
      'httpMethod',
      'components',
      'components-schemas',
      'components-parameters',
      'paths',
      'channels',
      'channelItem',
      'schema',
      'server',
      'servers',
      'channel-binding',
      'contact',
      'identifier',
      'message',
      'servers',
      'components-messages',
    ];

    const res: ArraySlice = filter((el: Element) => {
      return (
        el.classes.toValue().some((item: string) => allClasses.includes(item)) ||
        allClasses.includes(el.element)
      );
    }, api);

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < res.length; ++index) {
      const e = res.get(index);
      const set: string[] = Array.from(new Set(e.classes.toValue()));
      // add element value to the set (e.g. 'pathItem', 'operation'
      if (!set.includes(e.element)) {
        set.unshift(e.element);
      }
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

          //  TODO (francesco@tumanischvili@smartbear.com) replace with ns plugin/adapter
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
          } else if (s === 'pathItem' || s === 'channelItem') {
            const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
            const parent: MemberElement = e.parent as MemberElement;
            const key = parent.key as Element;
            si.containerName = key.toValue() as string;
            symbols.push(si);
          } else {
            const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
            const path = buildPath(e);
            si.containerName = path;
            symbols.push(si);
          }
        }
      });
    }
    return symbols;
  }
}
