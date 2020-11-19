import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ClientCapabilities } from 'vscode-languageserver-protocol';
// import { ClientCapabilities, Proposed } from 'vscode-languageserver-protocol';

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
  configure(settings: LanguageSettings): void;

  doValidation(document: TextDocument, context?: ValidationContext): PromiseLike<Diagnostic[]>;
  // doValidation(): PromiseLike<String>;

  /*
  doComplete(document: TextDocument, position: Position): PromiseLike<CompletionList | null>;

  doResolveCompletionItem(item: CompletionItem): PromiseLike<CompletionItem>;

  findDocumentSymbols(document: TextDocument, context?: SymbolsContext): PromiseLike<SymbolInformation[]>;

  computeSemanticTokens(content: string): PromiseLike<Proposed.SemanticTokens>;

  doHover(document: TextDocument, position: Position): PromiseLike<Hover | null>;

  findDocumentColors(document: TextDocument, context?: ColorsContext): Thenable<ColorInformation[]>;

  getColorPresentations(document: TextDocument, color: Color, range: Range): ColorPresentation[];

  format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];
  */
}
