import {
  CompletionItem,
  ColorInformation,
  Color,
  ColorPresentation,
  FormattingOptions,
  TextEdit,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { SemanticTokensLegend } from 'vscode-languageserver-protocol';
import { ParseResultElement } from '@swagger-api/apidom-core';

import {
  ColorsContext,
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
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
import { togglePerformanceLogs, toggleLogs } from './utils/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getLanguageService(context: LanguageServiceContext): LanguageService {
  togglePerformanceLogs(!!context.performanceLogs);
  if (context.logLevel) toggleLogs(context.logLevel);

  const symbolsService = new DefaultSymbolsService();
  const completionService = new DefaultCompletionService();
  const validationService = new DefaultValidationService();
  const semanticTokensService = new DefaultSemanticTokensService();
  const hoverService = new DefaultHoverService();
  const derefService = new DefaultDerefService();
  const definitionService = new DefaultDefinitionService();

  function configureServices(languageSettings?: LanguageSettings) {
    symbolsService.configure(languageSettings);
    validationService.configure(languageSettings);
    completionService.configure(languageSettings);
    semanticTokensService.configure(languageSettings);
    hoverService.configure(languageSettings);
    derefService.configure(languageSettings);
    definitionService.configure(languageSettings);
  }

  let metadata = config();
  if (context?.metadata) {
    metadata = context.metadata;
  }
  const documentCache = getDocumentCache<ParseResultElement>(10, 60, (document) =>
    parse(document, metadata.metadataMaps),
  );

  const languageSettings: LanguageSettings = {
    metadata,
    validate: true,
    validatorProviders: context?.validatorProviders,
    documentCache,
    performanceLogs: context.performanceLogs,
    logLevel: context.logLevel,
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
  };
}
