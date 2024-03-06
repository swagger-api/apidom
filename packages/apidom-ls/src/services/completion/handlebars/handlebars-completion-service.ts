/* eslint-disable no-param-reassign */
import { CompletionList, Position } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionParams } from 'vscode-languageserver-protocol';

import {
  CompletionContext,
  CompletionProvider,
  LanguageSettings,
  CompletionService,
} from '../../../apidom-language-types';
import { perfStart, perfEnd, findNamespace } from '../../../utils/utils';
import completeHandlebars from './handlebars-completion';
import { HandlebarsCompletionServiceJsonSchema } from './handlebars-completion-service-jsonschema';

enum PerfLabels {
  START = 'doCompletion',
  PARSE_FIRST = 'doCompletion-parse-first',
  PARSE_SECOND = 'doCompletion-parse-second',
  CORRECT_PARTIAL = 'doCompletion-correctPartialKeys',
}
// eslint-disable-next-line import/prefer-default-export
export class HandlebarsCompletionService implements CompletionService {
  private settings: LanguageSettings | undefined;

  private jsonSchemaCompletionService: CompletionService | undefined;

  private completionProviders: CompletionProvider[] = [];

  private jsonSchemaCompletion: boolean = false;

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.handlebarsJsonSchemaCompletion) {
        this.jsonSchemaCompletion = true;
        this.jsonSchemaCompletionService = new HandlebarsCompletionServiceJsonSchema();
      }
      if (settings.completionProviders) {
        this.completionProviders = settings.completionProviders;
      }
      for (const provider of this.completionProviders) {
        if (provider.configure) {
          provider.configure(settings);
        }
      }
    }
  }

  public registerProvider(provider: CompletionProvider): void {
    this.completionProviders.push(provider);
    if (this.settings) {
      if (provider.configure) {
        provider.configure(this.settings);
      }
    }
  }

  /*
    see also:
      https://github.com/microsoft/monaco-editor/issues/1889
      https://github.com/microsoft/monaco-editor/issues/2070
   */
  public async doCompletion(
    textDocument: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionList> {
    perfStart(PerfLabels.START);
    const context = !completionContext ? this.settings?.completionContext : completionContext;
    const enableFiltering = context?.enableLSPFilter;
    const completionList: CompletionList = {
      items: [],
      isIncomplete: false,
    };

    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const contentLanguage = await findNamespace(
      textDocument,
      this.settings?.defaultContentLanguage,
    );

    // TODO frantuma, better handling of namespaces/providers
    if (contentLanguage.namespace === 'handlebars' && !this.jsonSchemaCompletion) {
      return completeHandlebars(textDocument, position, enableFiltering);
    }
    if (contentLanguage.namespace === 'handlebars' && this.jsonSchemaCompletionService) {
      return this.jsonSchemaCompletionService.doCompletion(
        textDocument,
        completionParamsOrPosition,
        context,
      );
    }
    perfEnd(PerfLabels.START);
    return completionList;
  }
}
