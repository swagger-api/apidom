export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as getLanguageService } from './apidom-language-service.ts';

export {
  perfStart,
  perfEnd,
  isJsonDoc,
  isJsonDocSync,
  isYamlDoc,
  getText,
  findNamespace,
} from './utils/utils.ts';

export type {
  LanguageService,
  LanguageSettings,
  SymbolsContext,
  ValidationContext,
  CompletionContext,
  LinksContext,
  DerefContext,
  ValidationProvider,
  CompletionProvider,
  LinksProvider,
  WorkspaceContextService,
  ColorsContext,
  LanguageServiceContext,
  MetadataMap,
  Metadata,
  LinterMeta,
  LinterFunctionsMap,
  LinterFunctions,
  MetadataMaps,
  ApidomCompletionItem,
  CompletionProviderResult,
  ValidationProviderResult,
  HoverProviderResult,
  LinksProviderResult,
  ContentLanguage,
} from './apidom-language-types.ts';

export {
  SupportedLanguages,
  Format,
  CompletionType,
  ReferenceValidationMode,
  CompletionFormat,
  LogLevel,
  MergeStrategy,
  ProviderMode,
} from './apidom-language-types.ts';

export { config } from './config/config.ts';
