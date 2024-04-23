/* eslint-disable no-param-reassign */
import { CompletionList, Position } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionParams } from 'vscode-languageserver-protocol';
import { Draft07 } from 'json-schema-library';
// import { JSONSchemaFaker } from 'json-schema-faker';

import {
  CompletionContext,
  CompletionProvider,
  LanguageSettings,
  CompletionService,
} from '../../../apidom-language-types';
import { perfStart, perfEnd, findNamespace, debug } from '../../../utils/utils';
import completeHandlebars from './handlebars-completion';
import completeHandlebarsTypeExplorer from './handlebars-completion-type-explorer';
import { HandlebarsCompletionServiceJsonSchema } from './handlebars-completion-service-jsonschema';
// import { getContext } from '../../../utils/handlebars/context-openapi';
// import { getSchema } from '../../../utils/handlebars/context';
import { getContext, getSchema, getTypeSchema } from '../../../utils/handlebars/context';

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

  private jsonSchemaCompletionLibrary: 'faker' | 'library' | 'refParser' | 'type-explorer' =
    'faker';

  public configure(settings?: LanguageSettings): void {
    this.settings = settings;
    if (settings) {
      if (settings.handlebarsJsonSchemaCompletion) {
        this.jsonSchemaCompletion = true;
        if (settings.handlebarsJsonSchemaCompletionImplementation) {
          this.jsonSchemaCompletionLibrary = settings.handlebarsJsonSchemaCompletionImplementation;
        }
        if (this.jsonSchemaCompletionLibrary === 'refParser') {
          this.jsonSchemaCompletionService = new HandlebarsCompletionServiceJsonSchema();
        }
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
    debug(
      'HandlebarsCompletionService - configure',
      this.jsonSchemaCompletion,
      this.jsonSchemaCompletionLibrary,
    );
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

    const jsonSchemaCompletion = context?.handlebarsJsonSchemaCompletion
      ? true
      : this.jsonSchemaCompletion;
    const jsonSchemaCompletionLibrary = context?.handlebarsJsonSchemaCompletionImplementation
      ? context?.handlebarsJsonSchemaCompletionImplementation
      : this.jsonSchemaCompletionLibrary;
    const position =
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition;

    const contentLanguage = await findNamespace(
      textDocument,
      this.settings?.defaultContentLanguage,
    );

    // TODO frantuma, better handling of namespaces/providers
    if (contentLanguage.namespace === 'handlebars' && !jsonSchemaCompletion) {
      const templateContext = getContext(true);
      return completeHandlebars(textDocument, templateContext, position, enableFiltering);
    }
    if (
      contentLanguage.namespace === 'handlebars' &&
      jsonSchemaCompletion &&
      jsonSchemaCompletionLibrary === 'refParser'
    ) {
      return this.jsonSchemaCompletionService!.doCompletion(
        textDocument,
        completionParamsOrPosition,
        context,
      );
    }
    if (
      contentLanguage.namespace === 'handlebars' &&
      jsonSchemaCompletion &&
      jsonSchemaCompletionLibrary === 'faker'
    ) {
      // const templateSchema = getSchema();
      const templateContext = getContext(true);
      /* JSONSchemaFaker.option('alwaysFakeOptionals', true);
      JSONSchemaFaker.option('useExamplesValue', true);
      JSONSchemaFaker.option('useDefaultValue', true);
      JSONSchemaFaker.option('minItems', 1);
      JSONSchemaFaker.option('minLength', 1);
      JSONSchemaFaker.option('refDepthMin', 3);
      JSONSchemaFaker.option('refDepthMax', 7);
      JSONSchemaFaker.option('resolveJsonPath', true);
      JSONSchemaFaker.option('sortProperties', true);
      JSONSchemaFaker.option('refDepthMax', 7);
      const templateContext = JSONSchemaFaker.resolve(templateSchema);
      console.log('Faker templateContext', templateContext); */
      return completeHandlebars(textDocument, templateContext, position, enableFiltering);
    }
    if (
      contentLanguage.namespace === 'handlebars' &&
      jsonSchemaCompletion &&
      jsonSchemaCompletionLibrary === 'type-explorer'
    ) {
      const templateContext = getTypeSchema();
      return completeHandlebarsTypeExplorer(
        textDocument,
        templateContext,
        position,
        enableFiltering,
      );
    }
    if (
      contentLanguage.namespace === 'handlebars' &&
      jsonSchemaCompletion &&
      jsonSchemaCompletionLibrary === 'library'
    ) {
      const templateSchema = getSchema();
      // const templateContext = getContext(true);
      const jsonSchema7 = new Draft07(templateSchema);
      const templateContext = jsonSchema7.getTemplate({}, jsonSchema7.getSchema(), {
        addOptionalProps: true,
        removeInvalidData: false,
      });
      debug('Library templateContext', templateContext.components.schemas.key);
      return completeHandlebars(textDocument, templateContext, position, enableFiltering);
    }
    perfEnd(PerfLabels.START);
    return completionList;
  }
}
