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
import { Element } from 'minim';

import { Metadata } from './utils/utils';

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

/* represent any validation provider  */
export interface ValidationProvider {
  namespaces(): string[];

  break(): boolean;

  doValidation(
    textDocument: TextDocument,
    api: Element,
    validationContext?: ValidationContext,
  ): Promise<Diagnostic[]>;

  configure(settings: LanguageSettings): void;
}

export interface LanguageSettings {
  validate?: boolean;
  allowComments?: boolean;
  validatorProviders?: ValidationProvider[];
  metadata?: Metadata;
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
}
