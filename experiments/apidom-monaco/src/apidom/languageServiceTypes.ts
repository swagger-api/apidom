import {MarkupKind} from 'vscode-languageserver-types';
import {JSONSchema} from "./validation/schema/jsonSchema";

export {TextDocument} from 'vscode-languageserver-textdocument';
export * from 'vscode-languageserver-types';

export type SeverityLevel = 'error' | 'warning' | 'ignore';

export interface Thenable<R> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => TResult | Thenable<TResult>): Thenable<TResult>;

    then<TResult>(onfulfilled?: (value: R) => TResult | Thenable<TResult>, onrejected?: (reason: any) => void): Thenable<TResult>;
}

export interface LanguageSettings {
    /**
     * If set, the validator will return syntax and semantic errors.
     */
    validate?: boolean;
    /**
     * Defines whether comments are allowed or not. If set to false, comments will be reported as errors.
     * DocumentLanguageSettings.allowComments will override this setting.
     */
    allowComments?: boolean;
}

export interface DocumentLanguageSettings {
    /**
     * The severity of reported comments. If not set, 'LanguageSettings.allowComments' defines wheter comments are ignored or reported as errors.
     */
    comments?: SeverityLevel;

    /**
     * The severity of reported trailing commas. If not set, trailing commas will be reported as errors.
     */
    trailingCommas?: SeverityLevel;
}

export interface LanguageServiceParams {
    clientCapabilities?: ClientCapabilities;
}

/**
 * Describes what LSP capabilities the client supports
 */
export interface ClientCapabilities {
    /**
     * The text document client capabilities
     */
    textDocument?: {
        /**
         * Capabilities specific to completions.
         */
        completion?: {
            /**
             * The client supports the following `CompletionItem` specific
             * capabilities.
             */
            completionItem?: {
                /**
                 * Client supports the follow content formats for the documentation
                 * property. The order describes the preferred format of the client.
                 */
                documentationFormat?: MarkupKind[];

                /**
                 * The client supports commit characters on a completion item.
                 */
                commitCharactersSupport?: boolean
            };

        };
        /**
         * Capabilities specific to hovers.
         */
        hover?: {
            /**
             * Client supports the follow content formats for the content
             * property. The order describes the preferred format of the client.
             */
            contentFormat?: MarkupKind[];
        };
    };
}

/*
export namespace ClientCapabilities {
    export const LATEST: ClientCapabilities = {
        textDocument: {
            completion: {
                completionItem: {
                    documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
                    commitCharactersSupport: true
                }
            }
        }
    };
}
*/

export interface DocumentSymbolsContext {
    /**
     * The maximal number of document symbols returned.
     */
    resultLimit?: number;
    /**
     * Called when the result was cropped.
     */
    onResultLimitExceeded?: (uri: string) => void;
}

export interface ColorInformationContext {
    /**
     * The maximal number of color informations returned.
     */
    resultLimit?: number;
    /**
     * Called when the result was cropped.
     */
    onResultLimitExceeded?: (uri: string) => void;
}

export interface FoldingRangesContext {
    /**
     * The maximal number of ranges returned.
     */
    rangeLimit?: number;
    /**
     * Called when the result was cropped.
     */
    onRangeLimitExceeded?: (uri: string) => void;
}

export interface CompletionsCollector {
    add(suggestion: any): void;
    error(message: string): void;
    log(message: string): void;
    setAsIncomplete(): void;
    getNumberOfProposals(): number;
}
