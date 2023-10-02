import { TextDocument } from 'vscode-languageserver-textdocument';
import { isString } from 'ramda-adjunct';
import {
  ArraySlice,
  Element,
  filter,
  ObjectElement,
  toJSON,
  toString,
  toYAML,
  toValue,
} from '@swagger-api/apidom-core';
import { dereferenceApiDOM } from '@swagger-api/apidom-reference';

import { DerefContext, Format, LanguageSettings } from '../../apidom-language-types';
import { parse } from '../../parser-factory';
import { isJsonDoc } from '../../utils/utils';

export interface DerefService {
  doDeref(textDocument: TextDocument, derefContext: DerefContext): Promise<string>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultDerefService implements DerefService {
  private settings: LanguageSettings | undefined;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public async doDeref(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    derefContext?: DerefContext,
  ): Promise<string> {
    const context = !derefContext ? this.settings?.derefContext : derefContext;
    const text: string = textDocument.getText();

    const textFormat = (await isJsonDoc(text)) ? Format.JSON : Format.YAML;

    const result = await parse(
      text,
      this.settings?.metadata?.metadataMaps,
      false,
      false,
      false,
      this.settings?.defaultContentLanguage,
    );

    const api: ObjectElement = <ObjectElement>result.api;

    // no API document has been parsed
    if (api === undefined) return '';

    let baseURI: string | undefined = '/foo';

    const servers: ArraySlice = filter((el: Element) => {
      return toValue(el.classes).includes('servers');
    }, api);

    // TODO (francesco.tumanischvili@smartbear.com): this needs to be replaced by good metadata ('serverURL' to URLS and/or adapter/plugin
    if (servers && !servers.isEmpty) {
      const serversValue = toValue(servers.first);
      // OAS
      if (Array.isArray(serversValue)) {
        if (!servers.isEmpty) {
          const firstServer = serversValue[0];
          baseURI = firstServer.url;
        }
        // ASYNC
      } else if (Object.keys(serversValue).length > 0) {
        const firstServer = serversValue[Object.keys(serversValue)[0]];
        baseURI = firstServer.url;
      }
    }
    baseURI = isString(context?.baseURI) ? context?.baseURI : baseURI;
    const format =
      typeof context?.format !== 'undefined' && context.format in Format
        ? context.format
        : textFormat;

    // dereference
    const dereferenced = await dereferenceApiDOM(api, {
      resolve: {
        baseURI,
        resolverOpts: {
          fileAllowList: ['*'],
        },
      },
    });

    return format === Format.JSON
      ? toJSON(dereferenced, undefined, 2)
      : format === Format.YAML
      ? toYAML(dereferenced)
      : toString(dereferenced);
  }
}
