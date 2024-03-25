import { TextDocument } from 'vscode-languageserver-textdocument';
import { CancellationToken, DocumentHighlight } from 'vscode-languageserver-protocol';
import { Position } from 'vscode-languageserver-types';

import { LanguageSettings } from '../../apidom-language-types';
import { findNamespace } from '../../utils/utils';
import highlightDocumentHandlebars from './handlebars/handlebars-document-highlight';

export interface DocumentHighlightService {
  provideDocumentHighlights(
    textDocument: TextDocument,
    position: Position,
    token: CancellationToken,
  ): Promise<DocumentHighlight[] | undefined>;

  configure(settings?: LanguageSettings): void;
}

export class DefaultDocumentHighlightService implements DocumentHighlightService {
  private settings: LanguageSettings | undefined;

  private static _initialize: void = ((): void => {})();

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
  }

  // eslint-disable-next-line class-methods-use-this
  public async provideDocumentHighlights(
    textDocument: TextDocument,
    position: Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    token: CancellationToken,
  ): Promise<DocumentHighlight[] | undefined> {
    const text: string = textDocument.getText();

    const docNs: string = (await findNamespace(text, this.settings?.defaultContentLanguage))
      .namespace;
    // TODO frantuma, better handling of namespaces/providers
    if (docNs === 'handlebars') {
      return highlightDocumentHandlebars(textDocument, position);
    }
    return undefined;
  }
}
