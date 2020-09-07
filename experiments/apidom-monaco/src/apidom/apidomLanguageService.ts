import {
    LanguageServiceParams,
    LanguageSettings,
    DocumentLanguageSettings,
    TextDocument,
    Diagnostic,
    CompletionItem,
    CompletionList,
    DocumentSymbolsContext,
    SymbolInformation,
    DocumentSymbol,
    ColorInformationContext as DocumentColorsContext,
    ColorInformation,
    Color,
    ColorPresentation,
    Hover,
    FormattingOptions
    ,
    FoldingRange,
    FoldingRangesContext,
    TextEdit,
    SelectionRange,
    Position, Range, SymbolKind
} from './languageServiceTypes';
import {ValidationService} from "./validation/validationService";
//import { Proposed } from 'vscode-languageserver';
// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";
// @ts-ignore
import * as asyncapi2_0Adapter from "apidom-parser-adapter-asyncapi2-0-json";
import {
    allClasses,
    findAllTreeClasses,
    findAllTreeElementsWithClasses, findNodeAtOffset,
    getSourceMap,
    SourceMap
} from "./utils/objects";

// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';

import { ApiDOMCompletion } from './completion/ApiDOMCompletion';

// @ts-ignore
import {isMemberElement, ArraySlice, MemberElement, ObjectElement, Element} from 'apidom'

import { Proposed } from 'vscode-languageserver-protocol';
//import SemanticTokens = monaco.languages.SemanticTokens;
//import { SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';

export type OpenAPIDocument = { parseResult: any };
export type JSONDocument = {};

export class TokensLegend {

    private static tokenTypes = {};

    private static tokenModifiers = {};

    public static init() {
        this.tokenTypes[Proposed.SemanticTokenTypes.keyword] = 0;
        this.tokenTypes[Proposed.SemanticTokenTypes.comment] = 1;
        this.tokenTypes[Proposed.SemanticTokenTypes.parameter] = 2;
        this.tokenTypes[Proposed.SemanticTokenTypes.property] = 3;
        this.tokenTypes[Proposed.SemanticTokenTypes.label] = 4;
        this.tokenTypes[Proposed.SemanticTokenTypes.class] = 5;
        this.tokenTypes[Proposed.SemanticTokenTypes.macro] = 6;
        this.tokenTypes[Proposed.SemanticTokenTypes.string] = 7;
        this.tokenTypes[Proposed.SemanticTokenTypes.variable] = 8;
        this.tokenTypes[Proposed.SemanticTokenTypes.operator] = 9;
        this.tokenTypes["specVersion"] = 10;
        this.tokenTypes["version"] = 11;
        this.tokenTypes["info"] = 12;
        this.tokenTypes["operation"] = 13;
        this.tokenTypes["pathItem"] = 14;

        this.tokenModifiers[Proposed.SemanticTokenModifiers.declaration] = 1;
        this.tokenModifiers[Proposed.SemanticTokenModifiers.definition] = 2;
        this.tokenModifiers[Proposed.SemanticTokenModifiers.deprecated] = 4;
        this.tokenModifiers[Proposed.SemanticTokenModifiers.reference] = 8;
        this.tokenModifiers["httpMethod-GET"] = 16;
        this.tokenModifiers["httpMethod-POST"] = 32;
    }

    public static getLegend() {
        const tokenTypes = Object.keys(this.tokenTypes);
        const tokenModifiers = Object.keys(this.tokenModifiers);
        return {
            tokenModifiers,
            tokenTypes
        };
    }

    public static getTokenType(type: string): number {
        const tokenType = this.tokenTypes[type];
        return tokenType;
    }

    public static getTokenModifiers(modifiers: string[]): number {
        let bit = 0;
        for (const modifier of modifiers) {
            bit |= this.tokenModifiers[modifier];
        }
        return bit;
    }
}

export interface LanguageService {
    configure(settings: LanguageSettings): void;

    doValidation(document: TextDocument, documentSettings?: DocumentLanguageSettings): Thenable<Diagnostic[]>;

    doComplete(document: TextDocument, position: Position): Thenable<CompletionList | null>;

    findDocumentSymbols(document: TextDocument, context?: DocumentSymbolsContext): Thenable<SymbolInformation[]>;

    //computeSemanticTokens(content: string): Proposed.SemanticTokens;
    computeSemanticTokens(content: string): Thenable<Proposed.SemanticTokens>;
    //computeSemanticTokens(content: string): Thenable<monaco.languages.SemanticTokens>;
    //computeSemanticTokens(content: string): monaco.languages.SemanticTokens;


    doHover(document: TextDocument, position: Position): Thenable<Hover | null>;


    doResolve(item: CompletionItem): Thenable<CompletionItem>;

    findDocumentColors(document: TextDocument, doc: JSONDocument, context?: DocumentColorsContext): Thenable<ColorInformation[]>;

    getColorPresentations(document: TextDocument, doc: JSONDocument, color: Color, range: Range): ColorPresentation[];


    format(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];

    getFoldingRanges(document: TextDocument, context?: FoldingRangesContext): FoldingRange[];

    getSelectionRanges(document: TextDocument, positions: Position[], doc: JSONDocument): SelectionRange[];
}

export function getLanguageService(params: LanguageServiceParams): LanguageService {
    let promise = Promise;

    //let jsonCompletion = new JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
    //let jsonHover = new JSONHover(jsonSchemaService, params.contributions, promise);
    //let jsonDocumentSymbols = new JSONDocumentSymbols(jsonSchemaService);
    //let jsonValidation = new JSONValidation(jsonSchemaService, promise);

    let apidomCompletion = new ApiDOMCompletion(promise, params.clientCapabilities);

    let validationService = new ValidationService();

    return {
        configure: (settings: LanguageSettings) => {},
        doValidation: validationService.doValidation.bind(validationService),
        doComplete: apidomCompletion.doComplete.bind(apidomCompletion),
        findDocumentSymbols: (document: TextDocument, context?: DocumentSymbolsContext) => findDocumentSymbols(document, context),
        computeSemanticTokens: (content: string) => computeSemanticTokens(content),

        doHover: (document: TextDocument, position: Position) => computeHover(document, position),

        /* todo */
        doResolve: (item: CompletionItem) => Promise.resolve(item),
        findDocumentColors: (document: TextDocument, doc: JSONDocument, context?: DocumentColorsContext) => null,
        getColorPresentations: (document: TextDocument, doc: JSONDocument, color: Color, range: Range) => null,
        getFoldingRanges: (document: TextDocument, context?: FoldingRangesContext) => null,
        getSelectionRanges: (document: TextDocument, positions: Position[], doc: JSONDocument) => null,
        format: (d, r, o) => null
    };
}

export function getParser(document: TextDocument): ApiDOMParser {
    if (isAsyncDoc(document)) {
        return ApiDOMParser().use(asyncapi2_0Adapter);
    } else {
        return ApiDOMParser().use(openapi3_1Adapter);
    }
}

export function isAsyncDoc(document: TextDocument): boolean {
    let text: string = document.getText();
    if (text.indexOf("asyncapi") > -1) {
        return true;
    }
    return false;
}

export async function findDocumentSymbols(document: TextDocument, context?: DocumentSymbolsContext) {

    let parser = getParser(document);

    const parseResult = await parser.parse(document.getText(), {sourceMap: true});

    const api: namespace.Element = parseResult.api
    api.freeze() // !! freeze and add parent !!

    const symbols: SymbolInformation[] = [];

    const res  = findAllTreeElementsWithClasses(api);
    res.forEach(e => {
        const set: string[] = Array.from(new Set(e.classes.toValue()));
        set.forEach(s => {
            if (allClasses().includes(s)) {
                let r: Range;
                if (e.parent && e.parent.key) {
                    const sm = getSourceMap(e.parent.key);
                    r = Range.create({line: sm.line, character: sm.column}, {line: sm.endLine, character: sm.endColumn});
                } else {
                    const sm = getSourceMap(e);
                    r = Range.create({line: sm.line, character: sm.column}, {line: sm.endLine, character: sm.endColumn});
                }

                symbols.push(SymbolInformation.create(s, SymbolKind.Property, r));
            }
        })
    })

    return symbols;
}


//export function computeSemanticTokens(content: string): Proposed.SemanticTokens {
export async function computeSemanticTokens(content: string) {

    let document = TextDocument.create("", "", 0, content);
    let parser = getParser(document);

    const parseResult = await parser.parse(document.getText(), {sourceMap: true});

    const api: namespace.Element = parseResult.api
    api.freeze() // !! freeze and add parent !!

    let tokens: number[][] = [];

    const res  = findAllTreeElementsWithClasses(api);

    let lastLine = 0;
    let lastColumn = 0;
    res.forEach(e => {
        const set: string[] = Array.from(new Set(e.classes.toValue()));
        set.forEach(s => {
            if (allClasses().includes(s)) {
                let r: Range;
                let sm: SourceMap;
                if (e.parent && e.parent.key) {
                    sm = getSourceMap(e.parent.key);
                } else {
                    sm = getSourceMap(e);
                }
                let modifier = 0;
                if ("operation" == s) {
                    // check for httpMethod
                    modifier = TokensLegend.getTokenModifiers(["httpMethod-" + e.getMetaProperty("httpMethod").toValue()]);
                }
                const token = [
                    sm.line - lastLine,
                    sm.line == lastLine ? sm.column - lastColumn: sm.column,
                    sm.endOffset - sm.offset,
                    TokensLegend.getTokenType(s),
                    modifier ];
                tokens.push(token);
                lastLine = sm.line;
                lastColumn = sm.column
            }
        })
    })

    return {
        data: tokens.flat()
    } as Proposed.SemanticTokens
}

export async function computeHover(document: TextDocument, position: Position) {
    let parser = getParser(document);

    const parseResult = await parser.parse(document.getText(), {sourceMap: true});

    const api: namespace.Element = parseResult.api
    api.freeze() // !! freeze and add parent !!


    let offset = document.offsetAt(position);
    let node = findNodeAtOffset(api, offset, true);
    if (node.parent && isMemberElement(node.parent)) {
        const opEl: ObjectElement = (<MemberElement>node.parent).value;
        if (opEl.classes.toValue().includes('operation')) {
            const sm = getSourceMap(node);
            const httpMethod = opEl.getMetaProperty("httpMethod").toValue();
            const path = node.parent.parent.parent.key.toValue();
            const basePath = 'http://localhost';
            let hover = 'curl -X '+ httpMethod + ' ' + basePath + path;
            let hoverRange = Range.create(document.positionAt(sm.offset), document.positionAt(sm.offset + sm.length));
            let result: Hover = {
                contents: [hover],
                range: hoverRange
            };
            return result;
        }
    }
    return Promise.resolve(null);
}
