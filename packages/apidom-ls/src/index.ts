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
} from 'apidom';

export { default as getLanguageService } from './apidom-language-service';

export { isJsonDoc, isAsyncDoc, getText } from './parser-factory';

export type {
  LanguageService,
  LanguageSettings,
  SymbolsContext,
  ValidationContext,
  CompletionContext,
  WorkspaceContextService,
  ColorsContext,
  LanguageServiceContext,
} from './apidom-language-types';

export { SUPPORTED_LANGUAGES, FORMAT } from './apidom-language-types';

export type {
  MetadataMap,
  Metadata,
  LinterMeta,
  ElementMeta,
  LinterFunctionsMap,
  LinterFunctions,
  MetadataMaps,
} from './utils/utils';
