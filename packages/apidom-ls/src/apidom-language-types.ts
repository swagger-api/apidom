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
  data?: LinterMetaData;
  targetSpecs?: NamespaceVersion[];
  conditions?: LinterCondition[];
  negate?: boolean;
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
  metadataMaps: MetadataMaps;
  linterFunctions: LinterFunctionsMap;
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
