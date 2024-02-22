import {
  CompletionItem,
  ColorInformation,
  Color,
  ColorPresentation,
  FormattingOptions,
  TextEdit,
  Position,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { SemanticTokensLegend } from 'vscode-languageserver-protocol';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { evaluate } from '@swagger-api/apidom-json-pointer';

import {
  ColorsContext,
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
  AnyObject,
} from './apidom-language-types';
import { DefaultValidationService } from './services/validation/validation-service';
import { DefaultCompletionService } from './services/completion/completion-service';
import { DefaultSymbolsService } from './services/symbols/symbols-service';
import { DefaultSemanticTokensService } from './services/semantic-tokens/semantic-tokens-service';
import { DefaultHoverService } from './services/hover/hover-service';
import { DefaultDerefService } from './services/deref/deref-service';
import { DefaultDefinitionService } from './services/definition/definition-service';
import { getDocumentCache } from './document-cache';
import { parse } from './parser-factory';
import { config } from './config/config';
import { togglePerformanceLogs, toggleLogs, getSourceMap, debug } from './utils/utils';
import { DefaultLinksService } from './services/links/links-service';
import {
  refreshContext,
  getContext,
  renderTemplate,
  renderTemplateThroughService,
} from './utils/handlebars/context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getLanguageService(context: LanguageServiceContext): LanguageService {
  togglePerformanceLogs(!!context.performanceLogs);
  if (context.logLevel) toggleLogs(context.logLevel);
  debug('getLanguageService', context);
  const symbolsService = new DefaultSymbolsService();
  const completionService = new DefaultCompletionService();
  const validationService = new DefaultValidationService();
  const semanticTokensService = new DefaultSemanticTokensService();
  const hoverService = new DefaultHoverService();
  const derefService = new DefaultDerefService();
  const definitionService = new DefaultDefinitionService();
  const linksService = new DefaultLinksService();

  function configureServices(languageSettings?: LanguageSettings) {
    symbolsService.configure(languageSettings);
    validationService.configure(languageSettings);
    completionService.configure(languageSettings);
    semanticTokensService.configure(languageSettings);
    hoverService.configure(languageSettings);
    derefService.configure(languageSettings);
    definitionService.configure(languageSettings);
    linksService.configure(languageSettings);
  }

  let metadata = config();
  if (context?.metadata) {
    metadata = context.metadata;
  }
  const documentCache = getDocumentCache<ParseResultElement>(10, 60, (document) =>
    parse(document, metadata.metadataMaps, true, true, true, context.defaultContentLanguage),
  );

  const languageSettings: LanguageSettings = {
    metadata,
    validate: true,
    validatorProviders: context?.validatorProviders,
    completionProviders: context?.completionProviders,
    hoverProviders: context?.hoverProviders,
    linksProviders: context?.linksProviders,
    documentCache,
    hoverFollowLinkEntry: context?.hoverFollowLinkEntry,
    performanceLogs: context.performanceLogs,
    logLevel: context.logLevel,
    defaultContentLanguage: context.defaultContentLanguage,
    workspaceFolders: context.workspaceFolders,
    allowComments: context.allowComments,
    validationContext: context.validationContext,
    completionContext: context.completionContext,
    derefContext: context.derefContext,
    symbolsContext: context.symbolsContext,
    colorsContext: context.colorsContext,
    linksContext: context.linksContext,
  };
  configureServices(languageSettings);

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configure: (settings?: LanguageSettings): void => configureServices(settings),
    doValidation: validationService.doValidation.bind(validationService),
    doCompletion: completionService.doCompletion.bind(completionService),
    doFindDocumentSymbols: symbolsService.doFindDocumentSymbols.bind(symbolsService),
    computeSemanticTokens: semanticTokensService.computeSemanticTokens.bind(semanticTokensService),
    doHover: hoverService.computeHover.bind(hoverService),
    doCodeActions: validationService.doCodeActions.bind(validationService),
    doDeref: derefService.doDeref.bind(derefService),

    doProvideDefinition: definitionService.doProvideDefinition.bind(definitionService),
    doProvideReferences: definitionService.doProvideReferences.bind(definitionService),

    getSemanticTokensLegend(): SemanticTokensLegend {
      return semanticTokensService.getLegend();
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doResolveCompletionItem(item: CompletionItem): Promise<CompletionItem> {
      // @ts-ignore
      return Promise.resolve(undefined);
    },
    findDocumentColors(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      document: TextDocument,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      colorsContext?: ColorsContext,
    ): Promise<ColorInformation[]> {
      // @ts-ignore
      return undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[] {
      return [];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getColorPresentations(document: TextDocument, color: Color, range: Range): ColorPresentation[] {
      return [];
    },
    terminate(): void {
      documentCache.dispose();
    },
    registerCompletionProvider: completionService.registerProvider.bind(completionService),
    registerValidationProvider: validationService.registerProvider.bind(validationService),
    doLinks: linksService.doLinks.bind(linksService),
    registerLinksProvider: linksService.registerProvider.bind(linksService),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getJsonPointerPosition(document: TextDocument, path: string): Promise<Position | null> {
      const result = await documentCache?.get(
        document,
        undefined,
        'languageService-getJsonPathPosition',
      );
      if (!result) {
        return null;
      }
      const { api } = result;
      // no API document has been parsed
      if (api === undefined) return null;
      try {
        const jsonPointerResult = evaluate(path, api);
        const sm = getSourceMap(jsonPointerResult);
        return {
          line: sm.line,
          character: sm.column,
        };
      } catch (e) {
        return null;
      }
    },

    async refreshContext(
      url: string | null,
      mustacheContext?: AnyObject,
    ): Promise<AnyObject | null> {
      return refreshContext(url, mustacheContext);
    },

    getContext(processed?: boolean): AnyObject {
      return getContext(processed);
    },

    renderTemplate(template: string): string {
      return renderTemplate(template);
    },

    async renderTemplateThroughService(template: string): Promise<string> {
      return renderTemplateThroughService(template);
    },
  };
}
