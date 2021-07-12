import { TextDocument } from 'vscode-languageserver-textdocument';
import { dereferenceApiDOM } from 'apidom-reference';

import { DerefContext, FORMAT, LanguageSettings } from '../../apidom-language-types';
import { getParser } from '../../parser-factory';

export interface DerefService {
  doDeref(textDocument: TextDocument, derefContext: DerefContext): PromiseLike<string>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultDerefService implements DerefService {
  private settings: LanguageSettings | undefined;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public doDeref(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    derefContext?: DerefContext,
  ): PromiseLike<string> {
    // get right parser

    const baseURI =
      derefContext !== undefined
        ? derefContext.baseURI !== undefined
          ? derefContext.baseURI
          : '/'
        : '/';

    const format =
      derefContext !== undefined
        ? derefContext.format !== undefined
          ? derefContext.format
          : FORMAT.JSON
        : FORMAT.JSON;
    const parser = getParser(textDocument);
    const text: string = textDocument.getText();

    // parse
    // @ts-ignore
    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // if we cannot parse nothing to do
      if (!api) {
        return '';
      }
      return dereferenceApiDOM(api, {
        resolve: { baseURI },
      }).then((derefResult) => {
        const deref = derefResult.toValue();
        // JSON format
        if (format === FORMAT.JSON) {
          return JSON.stringify(deref, null, 2);
        }
        // YAML format
        if (format === FORMAT.YAML) {
          // TODO transform/serialize to YAML if format `YAML` is passed
          return JSON.stringify(deref, null, 2);
        }
        // default to JSON
        return JSON.stringify(deref, null, 2);
      });
    });
  }
}
