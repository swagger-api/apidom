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
  DocumentLink,
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  WorkspaceFolder,
  ClientCapabilities,
  CompletionParams,
  SemanticTokens,
  SemanticTokensLegend,
  CodeActionParams,
  DefinitionParams,
  ReferenceParams,
} from 'vscode-languageserver-protocol';
import { Element, ParseResultElement } from '@swagger-api/apidom-core';

export interface DocumentCache<T> {
  get(document: TextDocument, text?: string, caller?: string): Promise<T | undefined>;
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

export enum LogLevel {
  TRACE = 1,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  NONE,
}

export enum SupportedLanguages {
  OPENAPI_31,
  ASYNCAPI_20,
}

export enum Format {
  JSON,
  YAML,
}

export type Pointer = {
  node: Element;
  ref: string;
};

export enum MergeStrategy {
  REPLACE,
  PREPEND,
  APPEND,
  IGNORE,
}

export enum ProviderMode {
  FULL,
  REF,
}

export const APIDOM_LINTER = 'apilint';

export interface LanguageServiceContext {
  clientCapabilities?: ClientCapabilities;
  workspaceContext?: WorkspaceContextService;
  metadata?: Metadata;
  validatorProviders?: ValidationProvider[];
  completionProviders?: CompletionProvider[];
  hoverProviders?: HoverProvider[];
  linksProviders?: LinksProvider[];
  performanceLogs?: boolean;
  logLevel?: LogLevel;
  defaultContentLanguage?: ContentLanguage;
  workspaceFolders?: WorkspaceFolder[];
  hoverFollowLinkEntry?: boolean;
  allowComments?: boolean;
  validationContext?: ValidationContext;
  completionContext?: CompletionContext;
  derefContext?: DerefContext;
  symbolsContext?: SymbolsContext;
  colorsContext?: ColorsContext;
  linksContext?: LinksContext;
}

export interface NamespaceVersion {
  namespace: string;
  version: string;
}

export interface ContentLanguage {
  namespace: string;
  format?: 'JSON' | 'YAML';
  version?: string;
}

export interface ValidationProviderResult {
  diagnostics: Diagnostic[];
  mergeStrategy: MergeStrategy;
  quickFixes?: Record<string, QuickFixData[]>;
}

export interface CompletionProviderResult {
  completionList: CompletionList;
  mergeStrategy: MergeStrategy;
}

export interface HoverProviderResult {
  hoverContent: string[];
  mergeStrategy: MergeStrategy;
}

export interface LinksProviderResult {
  links: DocumentLink[];
  mergeStrategy: MergeStrategy;
}

/* represent any validation provider  */
export interface ValidationProvider {
  namespaces(): NamespaceVersion[];

  break(): boolean;

  providerMode?(): ProviderMode;

  doValidation?(
    textDocument: TextDocument,
    api: Element,
    currentDiagnostics: Diagnostic[],
    validationContext?: ValidationContext,
  ): Promise<ValidationProviderResult>;

  configure?(settings: LanguageSettings): void;

  doRefValidation?(
    textDocument: TextDocument,
    api: Element,
    element: Element,
    referencedElement: string,
    refValue: string,
    currentDiagnostics: Diagnostic[],
    validationContext?: ValidationContext,
  ): ValidationProviderResult;

  name(): string;
}

/* represent any completion provider  */
export interface CompletionProvider {
  namespaces(): NamespaceVersion[];

  break(): boolean;

  providerMode?(): ProviderMode;

  doCompletion?(
    textDocument: TextDocument,
    element: Element | undefined,
    api: Element | undefined,
    completionParamsOrPosition: CompletionParams | Position,
    currentCompletionItems: CompletionItem[],
    completionContext?: CompletionContext,
  ): Promise<CompletionProviderResult>;

  doRefCompletion?(
    textDocument: TextDocument,
    element: Element | undefined,
    api: Element | undefined,
    refValue: string,
    referencedElement: string,
    completionParamsOrPosition: CompletionParams | Position,
    currentCompletionItems: CompletionItem[],
    completionContext?: CompletionContext,
  ): CompletionProviderResult | Promise<CompletionProviderResult>;

  configure?(settings: LanguageSettings): void;

  name(): string;
}

/* represent any hover provider  */
export interface HoverProvider {
  namespaces(): NamespaceVersion[];

  break(): boolean;

  providerMode?(): ProviderMode;

  doHover?(
    textDocument: TextDocument,
    position: Position,
    element: Element | undefined,
    api: Element | undefined,
    currentHoverItems: string[],
  ): Promise<HoverProviderResult>;

  doRefHover?(
    textDocument: TextDocument,
    position: Position,
    element: Element | undefined,
    api: Element | undefined,
    refValue: string,
    currentHoverItems: string[],
  ): HoverProviderResult | Promise<HoverProviderResult>;

  configure?(settings: LanguageSettings): void;

  name(): string;
}

/* represent any Links provider  */
export interface LinksProvider {
  namespaces(): NamespaceVersion[];

  break(): boolean;

  providerMode?(): ProviderMode;

  doLinks?(
    textDocument: TextDocument,
    api: Element,
    currentLinks: DocumentLink[],
    linksContext?: LinksContext,
  ): Promise<LinksProviderResult>;

  doRefLinks?(
    textDocument: TextDocument,
    api: Element,
    currentRefLinks: DocumentLink[],
    linksContext?: LinksContext,
  ): LinksProviderResult | Promise<LinksProviderResult>;

  configure?(settings: LanguageSettings): void;

  name(): string;
}
export interface LanguageSettings {
  validate?: boolean;
  allowComments?: boolean;
  validatorProviders?: ValidationProvider[];
  completionProviders?: CompletionProvider[];
  hoverProviders?: HoverProvider[];
  linksProviders?: LinksProvider[];
  metadata?: Metadata;
  documentCache?: DocumentCache<ParseResultElement>;
  performanceLogs?: boolean;
  logLevel?: LogLevel;
  defaultContentLanguage?: ContentLanguage;
  workspaceFolders?: WorkspaceFolder[];
  hoverFollowLinkEntry?: boolean;
  validationContext?: ValidationContext;
  completionContext?: CompletionContext;
  derefContext?: DerefContext;
  symbolsContext?: SymbolsContext;
  colorsContext?: ColorsContext;
  linksContext?: LinksContext;
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
  format?: Format;
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

export type LinksModifierFunction = ((value: string) => string) | undefined;

export interface LinksContext {
  maxNumberOfLinks?: number;
  enableTrivialLinkDiscovery?: boolean;
  modifierFunction?: LinksModifierFunction;
}

export interface WorkspaceContextService {
  resolveRelativePath(relativePath: string, resource: string): string;
}

export enum CompletionType {
  PROPERTY,
  VALUE,
  UNDEFINED,
}

export enum CompletionFormat {
  UNQUOTED,
  QUOTED,
  QUOTED_FORCED,
  OBJECT,
  ARRAY,
  ARRAY_OBJECT,
  UNDEFINED,
}

export interface ApidomCompletionItem extends CompletionItem {
  targetSpecs?: NamespaceVersion[];
  target?: string;
  arrayMember?: boolean;
  type?: CompletionType;
  format?: CompletionFormat;
  insertTextJson?: string;
  insertTextYaml?: string;
  conditions?: LinterCondition[];
  function?: string;
  functionParams?: [unknown] | undefined | unknown;
}

export interface DocumentationMeta {
  target?: string;
  docs: string;
  summary?: string;
  targetSpecs?: NamespaceVersion[];
  conditions?: LinterCondition[];
}

export interface QuickFixData {
  message: string;
  function?: string;
  functionParams?: [any];
  action: string;
  // TODO solve, validation meta also format based
  snippetYaml?: string;
  snippetJson?: string;
  target?: string;
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
  linterParams?: [unknown] | undefined | unknown;
  marker?: string;
  markerTarget?: string;
  target?: string;
  targetFields?: boolean;
  data?: LinterMetaData;
  targetSpecs?: NamespaceVersion[];
  conditions?: LinterCondition[];
  negate?: boolean;
  name?: string;
  description?: string;
  summary?: string;
  recommended?: boolean;
  given?: string[] | string;
}

export interface LinterCondition {
  targets?: LinterConditionTarget[];
  function: string;
  negate?: boolean;
  params?: [unknown] | undefined | unknown;
}

export interface LinterConditionTarget {
  path?: string;
  clazz?: string;
}

export interface FormatMeta {
  documentation?: DocumentationMeta[];
  lint?: LinterMeta[];
  completion?: ApidomCompletionItem[];
}

export interface MetadataMap {
  [index: string]: FormatMeta;
}

export interface MetadataMaps {
  [index: string]: MetadataMap;
}

export interface Metadata {
  rules?: Record<string, FormatMeta>;
  metadataMaps: MetadataMaps;
  linterFunctions: LinterFunctionsMap;
  symbols: string[];
  tokens: string[];
}

export interface LinterFunctionsMap {
  [index: string]: LinterFunctions;
}

export type LinterFunction = ((...args: any[]) => boolean) | undefined;
export type CompletionFunction = ((...args: any[]) => CompletionItem[]) | undefined;
export type ConditionFunction = ((...args: any[]) => boolean) | undefined;

export interface FunctionItem {
  functionName: string;
  function: LinterFunction | CompletionFunction | ConditionFunction;
}

export interface LinterFunctions {
  [index: string]: LinterFunction;
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

  doLinks(document: TextDocument, context?: LinksContext): Promise<DocumentLink[]>;

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

  registerValidationProvider(validationProvider: ValidationProvider): void;
  registerCompletionProvider(completionProvider: CompletionProvider): void;
  registerLinksProvider(linksProvider: LinksProvider): void;

  getJsonPointerPosition(document: TextDocument, path: string): Promise<Position | null>;
}
