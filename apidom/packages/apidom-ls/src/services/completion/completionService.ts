import { CompletionList } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { LanguageSettings, CompletionContext } from 'apidom-ls/src/apidomLanguageTypes';
import { CompletionParams } from 'vscode-languageserver-protocol';

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

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
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
    return Promise.resolve(CompletionList.create());
  }
}
