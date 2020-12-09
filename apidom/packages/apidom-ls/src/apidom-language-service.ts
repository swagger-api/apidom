import {
  CompletionItem,
  Hover,
  ColorInformation,
  Color,
  ColorPresentation,
  FormattingOptions,
  TextEdit,
} from 'vscode-languageserver-types';
import { SemanticTokens } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefaultJsonSchemaService } from './services/json-schema/json-schema-service';
import {
  ColorsContext,
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
} from './apidom-language-types';

import { DefaultValidationService } from './services/validation/validation-service';
import { DefaultCompletionService } from './services/completion/completion-service';
import { DefaultSymbolsService } from './services/symbols/symbols-service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getLanguageService(context: LanguageServiceContext): LanguageService {
  const jsonSchemaService = new DefaultJsonSchemaService();
  const symbolsService = new DefaultSymbolsService();
  const completionService = new DefaultCompletionService(jsonSchemaService);
  const validationService = new DefaultValidationService(jsonSchemaService);

  function configureServices(languageSettings?: LanguageSettings) {
    jsonSchemaService.configure(languageSettings);
    symbolsService.configure(languageSettings);
    validationService.configure(languageSettings);
    completionService.configure(languageSettings);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configure: (settings?: LanguageSettings): void => configureServices(settings),
    doValidation: validationService.doValidation.bind(validationService),
    doCompletion: completionService.doCompletion.bind(completionService),
    doFindDocumentSymbols: symbolsService.doFindDocumentSymbols.bind(symbolsService),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    computeSemanticTokens(content: string): PromiseLike<SemanticTokens> {
      // @ts-ignore
      return Promise.resolve(undefined);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doHover(document: TextDocument, position: Position): PromiseLike<Hover | null> {
      // @ts-ignore
      return Promise.resolve(undefined);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doResolveCompletionItem(item: CompletionItem): PromiseLike<CompletionItem> {
      // @ts-ignore
      return Promise.resolve(undefined);
    },
    findDocumentColors(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      document: TextDocument,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      colorsContext?: ColorsContext,
    ): PromiseLike<ColorInformation[]> {
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
  };
}
