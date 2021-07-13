import { TextDocument } from 'vscode-languageserver-textdocument';
import { dereferenceApiDOM } from 'apidom-reference';
import { isString } from 'ramda-adjunct';
import { toValue } from 'apidom';

import { DerefContext, FORMAT, LanguageSettings } from '../../apidom-language-types';
import { getParser } from '../../parser-factory';

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
    // get right parser

    const baseURI = isString(derefContext?.baseURI) ? derefContext?.baseURI : '/';
    const format = isString(derefContext?.format) ? derefContext?.format : FORMAT.JSON;
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    // parse
    const { api } = await parser.parse(text, { sourceMap: true });

    // no API document has been parsed
    if (api === undefined) return '';

    // dereference
    const dereferenced = await dereferenceApiDOM(api, {
      resolve: { baseURI },
    });
    const dereferencedValue = toValue(dereferenced);

    // TODO(francesco.tumanischvili@smartbear.com): transform/serialize to YAML if format `YAML` is passed
    // @ts-ignore
    return format === FORMAT.YAML
      ? JSON.stringify(dereferencedValue, null, 2) // serialize to YAML
      : JSON.stringify(dereferencedValue, null, 2); // default to JSON
  }
}
