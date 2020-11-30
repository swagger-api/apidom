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
} from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  ClientCapabilities,
  CompletionParams,
  SemanticTokens,
} from 'vscode-languageserver-protocol';

export enum SUPPORTED_LANGUAGES {
  OPENAPI_31,
  ASYNCAPI_20,
}

export interface LanguageServiceContext {
  clientCapabilities?: ClientCapabilities;
  workspaceContext?: WorkspaceContextService;
}

export interface LanguageSettings {
  validate?: boolean;
  allowComments?: boolean;
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
  doValidation(document: TextDocument, context?: ValidationContext): PromiseLike<Diagnostic[]>;
  doCompletion(
    document: TextDocument,
    completionParams: CompletionParams,
    context?: CompletionContext,
  ): PromiseLike<CompletionList | null>;
  doFindDocumentSymbols(
    textDocument: TextDocument,
    context?: SymbolsContext,
  ): PromiseLike<SymbolInformation[]>;

  doResolveCompletionItem(item: CompletionItem): PromiseLike<CompletionItem>;

  computeSemanticTokens(content: string): PromiseLike<SemanticTokens>;

  doHover(document: TextDocument, position: Position): PromiseLike<Hover | null>;

  findDocumentColors(
    document: TextDocument,
    colorsContext?: ColorsContext,
  ): PromiseLike<ColorInformation[]>;

  getColorPresentations(document: TextDocument, color: Color, range: Range): ColorPresentation[];

  format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];
}
