import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  SymbolInformation,
  CompletionItem,
  Hover,
  ColorInformation,
  Color,
  ColorPresentation,
  FormattingOptions,
  TextEdit,
  Position,
  CodeAction,
  Location,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  ClientCapabilities,
  CompletionParams,
  SemanticTokens,
  SemanticTokensLegend,
  CodeActionParams,
  DefinitionParams,
  ReferenceParams,
} from 'vscode-languageserver-protocol';
import { Element, ParseResultElement } from '@swagger-api/apidom-core';

import { DocumentCache } from './document-cache';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SUPPORTED_LANGUAGES {
  OPENAPI_31,
  ASYNCAPI_20,
}

export enum FORMAT {
  JSON,
  YAML,
}

export const APIDOM_LINTER = 'apilint';

export interface LanguageServiceContext {
  clientCapabilities?: ClientCapabilities;
  workspaceContext?: WorkspaceContextService;
  metadata?: Metadata;
  validatorProviders?: ValidationProvider[];
}

export interface NamespaceVersion {
  namespace: string;
  version: string;
}
/* represent any validation provider  */
export interface ValidationProvider {
  namespaces(): NamespaceVersion[];

  break(): boolean;

  doValidation(
    textDocument: TextDocument,
    api: Element,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]>;

  configure(settings: LanguageSettings): void;

  name(): string;
}

export interface LanguageSettings {
  validate?: boolean;
  allowComments?: boolean;
  validatorProviders?: ValidationProvider[];
  metadata?: Metadata;
  documentCache?: DocumentCache<ParseResultElement>;
}

// export type SeverityLevel = 'error' | 'warning' | 'ignore';

export interface ValidationContext {
  comments?: DiagnosticSeverity;
  relatedInformation?: boolean;
  maxNumberOfProblems?: number;
}

export interface CompletionContext {
  maxNumberOfItems?: number;
}

export interface DerefContext {
  format?: FORMAT;
  baseURI?: string;
}

export interface SymbolsContext {
  resultLimit?: number;
  onResultLimitExceeded?: (uri: string) => void;
}

export interface ColorsContext {
  resultLimit?: number;
  onResultLimitExceeded?: (uri: string) => void;
}

export interface WorkspaceContextService {
  resolveRelativePath(relativePath: string, resource: string): string;
}

export interface ApidomCompletionItem extends CompletionItem {
  targetSpecs?: NamespaceVersion[];
  target?: string;
}

export interface ElementMeta {
  completion?: ApidomCompletionItem[];
  validation?: string[];
}

export interface QuickFixData {
  message: string;
  function?: string;
  functionParams?: [any];
  action: string;
  // TODO solve, validation meta also format based
  snippetYaml?: string;
  snippetJson?: string;
}
export interface LinterMetaData {
  quickFix?: QuickFixData[];
}
export interface LinterMeta {
  code?: number;
  message?: string;
  source?: string;
  severity?: 1 | 2 | 3 | 4 | undefined;
  linterFunction?: string;
  linterParams?: [any];
  marker?: string;
  target?: string;
  data?: LinterMetaData;
  targetSpecs?: NamespaceVersion[];
}

export interface FormatMeta {
  [index: string]: ElementMeta | string | LinterMeta[];
}

export interface MetadataMap {
  [index: string]: FormatMeta;
}

export interface MetadataMaps {
  [index: string]: MetadataMap;
}

export interface Metadata {
  metadataMaps: MetadataMaps;
  linterFunctions: LinterFunctionsMap;
}

export interface LinterFunctionsMap {
  [index: string]: LinterFunctions;
}

export interface LinterFunctions {
  [index: string]: (element: Element) => boolean;
}

export interface LanguageService {
  configure(settings?: LanguageSettings): void;
  doValidation(document: TextDocument, context?: ValidationContext): Promise<Diagnostic[]>;
  doCompletion(
    document: TextDocument,
    completionParamsOrPosition: CompletionParams | Position,
    context?: CompletionContext,
  ): Promise<CompletionList | null>;
  doFindDocumentSymbols(
    textDocument: TextDocument,
    context?: SymbolsContext,
  ): Promise<SymbolInformation[]>;

  doResolveCompletionItem(item: CompletionItem): Promise<CompletionItem>;

  computeSemanticTokens(textDocument: TextDocument): Promise<SemanticTokens>;

  getSemanticTokensLegend(): SemanticTokensLegend;

  doHover(document: TextDocument, position: Position): Promise<Hover | undefined>;

  doDeref(document: TextDocument, context?: DerefContext): Promise<string>;

  doProvideDefinition(
    document: TextDocument,
    definitionParams: DefinitionParams,
  ): Promise<Location | null>;

  doProvideReferences(
    textDocument: TextDocument,
    referenceParams: ReferenceParams,
  ): Promise<Location[] | null>;

  doCodeActions(
    textDocument: TextDocument,
    parmsOrDiagnostics: CodeActionParams | Diagnostic[],
  ): Promise<CodeAction[]>;

  findDocumentColors(
    document: TextDocument,
    colorsContext?: ColorsContext,
  ): Promise<ColorInformation[]>;

  getColorPresentations(document: TextDocument, color: Color, range: Range): ColorPresentation[];

  format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];
  terminate(): void;
}
