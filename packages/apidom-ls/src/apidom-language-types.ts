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

/**
 * @public
 */
export interface DocumentCache<T> {
  get(document: TextDocument, text?: string, caller?: string): Promise<T | undefined>;
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

/**
 * @public
 */
export enum LogLevel {
  TRACE = 1,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  NONE,
}

/**
 * @public
 */
export enum SupportedLanguages {
  OPENAPI_31,
  ASYNCAPI_20,
}

/**
 * @public
 */
export enum Format {
  JSON,
  YAML,
}

export type Pointer = {
  node: Element;
  ref: string;
  isRef: boolean;
};

/**
 * @public
 */
export enum MergeStrategy {
  REPLACE,
  PREPEND,
  APPEND,
  IGNORE,
}

/**
 * @public
 */
export enum ProviderMode {
  FULL,
  REF,
}

export const APIDOM_LINTER = 'apilint';

/**
 * @public
 */
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

/**
 * @public
 */
export interface NamespaceVersion {
  namespace: string;
  version: string;
}

/**
 * @public
 */
export interface ContentLanguage {
  mediaType: string;
  namespace: string;
  format?: 'JSON' | 'YAML';
  version?: string;
  admitsRefsSiblings?: boolean;
}

/**
 * @public
 */
export interface ValidationProviderResult {
  diagnostics: Diagnostic[];
  mergeStrategy: MergeStrategy;
  quickFixes?: Record<string, QuickFixData[]>;
}

/**
 * @public
 */
export interface CompletionProviderResult {
  completionList: CompletionList;
  mergeStrategy: MergeStrategy;
}

/**
 * @public
 */
export interface HoverProviderResult {
  hoverContent: string[];
  mergeStrategy: MergeStrategy;
}

/**
 * @public
 */
export interface LinksProviderResult {
  links: DocumentLink[];
  mergeStrategy: MergeStrategy;
}

/**
 * Represents any validation provider.
 * @public
 */
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

/**
 * Represents any completion provider.
 * @public
 */
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

/**
 * Represents any hover provider.
 * @public
 */
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

/**
 * Represents any Links provider.
 * @public
 */
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

/**
 * @public
 */
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

/**
 * @public
 */
export enum ReferenceValidationMode {
  LEGACY,
  APIDOM_INDIRECT,
  APIDOM_INDIRECT_EXTERNAL,
}

/**
 * @public
 */
export interface ValidationContext {
  comments?: DiagnosticSeverity;
  relatedInformation?: boolean;
  maxNumberOfProblems?: number;
  baseURI?: string;
  referenceValidationMode?: ReferenceValidationMode;
  referenceValidationSequentialProcessing?: boolean;
}

/**
 * @public
 */
export interface CompletionContext {
  maxNumberOfItems?: number;
  enableLSPFilter?: boolean;
  includeIndirectRefs?: boolean;
}

/**
 * @public
 */
export interface DerefContext {
  format?: Format;
  baseURI?: string;
}

/**
 * @public
 */
export interface SymbolsContext {
  resultLimit?: number;
  onResultLimitExceeded?: (uri: string) => void;
}

/**
 * @public
 */
export interface ColorsContext {
  resultLimit?: number;
  onResultLimitExceeded?: (uri: string) => void;
}

/**
 * @public
 */
export type LinksModifierFunction = ((value: string) => string) | undefined;

/**
 * @public
 */
export interface LinksContext {
  maxNumberOfLinks?: number;
  enableTrivialLinkDiscovery?: boolean;
  modifierFunction?: LinksModifierFunction;
}

/**
 * @public
 */
export interface WorkspaceContextService {
  resolveRelativePath(relativePath: string, resource: string): string;
}

/**
 * @public
 */
export enum CompletionType {
  PROPERTY,
  VALUE,
  UNDEFINED,
}

/**
 * @public
 */
export enum CompletionFormat {
  UNQUOTED,
  QUOTED,
  QUOTED_FORCED,
  OBJECT,
  ARRAY,
  ARRAY_OBJECT,
  UNDEFINED,
  PARTIAL_KEY,
  PARTIAL_KEY_QUOTED,
}

/**
 * @public
 */
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

/**
 * @public
 */
export interface DocumentationMeta {
  target?: string;
  docs: string;
  summary?: string;
  targetSpecs?: NamespaceVersion[];
  conditions?: LinterCondition[];
}

/**
 * @public
 */
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

/**
 * @public
 */
export interface LinterMetaData {
  quickFix?: QuickFixData[];
}

/**
 * @public
 */
export enum LinterGivenFormat {
  SEMANTIC = 'SEMANTIC',
  JSONPATH = 'JSONPATH',
}

/**
 * @public
 */
export interface LinterMeta {
  code?: number;
  message?: string;
  source?: string;
  /**
   * ```
   * 1 => Error; Something not allowed by the rules of a language or other means.
   * 2 => Warning; Something suspicious but allowed.
   * 3 => Information; Something to inform about but not a problem.
   * 4 => Hint; Something not allowed by the rules of a language or other means.
   * ```
   */
  severity?: DiagnosticSeverity | undefined;
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
  givenFormat?: LinterGivenFormat;
}

/**
 * @public
 */
export interface LinterCondition {
  targets?: LinterConditionTarget[];
  function: string;
  negate?: boolean;
  params?: [unknown] | undefined | unknown;
}

/**
 * @public
 */
export interface LinterConditionTarget {
  path?: string;
  clazz?: string;
}

/**
 * @public
 */
export interface FormatMeta {
  documentation?: DocumentationMeta[];
  lint?: LinterMeta[];
  completion?: ApidomCompletionItem[];
}

/**
 * @public
 */
export interface MetadataMap {
  [index: string]: FormatMeta;
}

/**
 * @public
 */
export interface MetadataMaps {
  [index: string]: MetadataMap;
}

/**
 * @public
 */
export interface Metadata {
  rules?: Record<string, FormatMeta>;
  metadataMaps: MetadataMaps;
  linterFunctions: LinterFunctionsMap;
  symbols: string[];
  tokens: string[];
}

/**
 * @public
 */
export interface LinterFunctionsMap {
  [index: string]: LinterFunctions;
}

/**
 * @public
 */
export type LinterFunction = ((...args: any[]) => boolean) | undefined;
export type CompletionFunction = ((...args: any[]) => CompletionItem[]) | undefined;
export type ConditionFunction = ((...args: any[]) => boolean) | undefined;

export interface FunctionItem {
  functionName: string;
  function: LinterFunction | CompletionFunction | ConditionFunction;
}

/**
 * @public
 */
export interface LinterFunctions {
  [index: string]: LinterFunction;
}

/**
 * @public
 */
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
