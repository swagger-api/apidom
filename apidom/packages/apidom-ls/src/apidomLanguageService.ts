/*
// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";
// @ts-ignore
import * as asyncapi2_0Adapter from "apidom-parser-adapter-asyncapi2-0-json";
// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';
*/

import { LanguageService, LanguageServiceContext, LanguageSettings } from './apidomLanguageTypes';

/* import {Diagnostic, Position, CompletionList, CompletionItem, SymbolInformation, Hover, ColorInformation, ColorPresentation, Color, FormattingOptions, TextEdit} from "vscode-languageserver-types"
import {TextDocument} from "vscode-languageserver-textdocument"
import {Proposed} from "vscode-languageserver-protocol" */
import { DefaultValidationService } from './services/validation/validationService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getLanguageService(context: LanguageServiceContext): LanguageService {
  // let apidomCompletion = new ApiDOMCompletion(promise, params.clientCapabilities);

  const validationService = new DefaultValidationService();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configure: (settings: LanguageSettings): void => {},
    // doValidation: () => {return Promise.resolve("res")},
    doValidation: validationService.doValidation.bind(validationService),

    // doComplete: apidomCompletion.doComplete.bind(apidomCompletion),
    // findDocumentSymbols: (document: TextDocument, context?: DocumentSymbolsContext) => findDocumentSymbols(document, context),
    // computeSemanticTokens: (content: string) => computeSemanticTokens(content),

    // doHover: (document: TextDocument, position: Position) => computeHover(document, position),

    /* todo */
    // doResolve: (item: CompletionItem) => Promise.resolve(item),
    // findDocumentColors: (document: TextDocument, doc: JSONDocument, context?: DocumentColorsContext) => null,
    // getColorPresentations: (document: TextDocument, doc: JSONDocument, color: Color, range: Range) => null,
    // getFoldingRanges: (document: TextDocument, context?: FoldingRangesContext) => null,
    // getSelectionRanges: (document: TextDocument, positions: Position[], doc: JSONDocument) => null,
    // format: (d, r, o) => null
  };
}

/*
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
                // cheat now here for demo
                if (s == "operation") {
                    const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
                    si.containerName = e.parent.parent.parent.key.toValue() + ' -> ' + e.parent.key.toValue();
                    symbols.push(si);
                } else if (s == "pathItem") {
                    const si: SymbolInformation = SymbolInformation.create(s, SymbolKind.Property, r);
                    si.containerName = e.parent.key.toValue();
                    symbols.push(si);
                } else {
                    symbols.push(SymbolInformation.create(s, SymbolKind.Property, r));
                }

            }
        })
    })

    return symbols;
}

export async function computeSemanticTokens(content: string) {

    let document = TextDocument.create("", "", 0, content);
    let parser = getParser(document);

    const parseResult = await parser.parse(document.getText(), {sourceMap: true});

    const api: namespace.Element = parseResult.api
    api.freeze() // !! freeze and add parent !!

    let tokens: number[][] = [];

    let lastLine = 0;
    let lastColumn = 0;

    let processed: Element[] = []

    const buildTokens = (element) => {
        let foundClasses = false;
        let parentNode = false;
        if (element.classes) {
            const set: string[] = Array.from(new Set(element.classes.toValue()));
            set.forEach(s => {
                if (allClasses().includes(s)) {
                    foundClasses = true;
                    let r: Range;
                    let sm: SourceMap;
                    if (element.parent && element.parent.key) {
                        sm = getSourceMap(element.parent.key);
                        parentNode = true;
                        processed.push(element.parent.key);
                    } else {
                        sm = getSourceMap(element);
                        processed.push(element);
                    }
                    let modifier = 0;
                    if ("operation" == s) {
                        // check for httpMethod
                        modifier = TokensLegend.getTokenModifiers(["httpMethod-" + element.getMetaProperty("httpMethod", 'GET').toValue()]);
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
            });
        }
        if (!processed.includes(element) && (!foundClasses || parentNode)) {

            if (isStringElement(element) || isNumberElement(element)) {
                let sm: SourceMap = getSourceMap(element);
                let token;
                /!*if (element.parent && element.parent.key && element.parent.key === element) {
                    // this is a key
                    console.log("KEY", element.toValue());
                    token = [
                        sm.line - lastLine,
                        sm.line == lastLine ? sm.column - lastColumn: sm.column,
                        sm.endOffset - sm.offset,
                        TokensLegend.getTokenType("key"),
                        TokensLegend.getTokenModifiers(isStringElement(element) ? ["string"] : ["number"])
                    ];

                } else if (element.parent && element.parent.value && element.parent.value === element) {*!/
                if (element.parent && element.parent.value && element.parent.value === element) {
                    // this is a value
                    token = [
                        sm.line - lastLine,
                        sm.line == lastLine ? sm.column - lastColumn : sm.column,
                        sm.endOffset - sm.offset,
                        TokensLegend.getTokenType("value"),
                        TokensLegend.getTokenModifiers(isStringElement(element) ? ["string"] : ["number"])
                    ];
                    tokens.push(token);
                    lastLine = sm.line;
                    lastColumn = sm.column

                    //} else {
                } else if (!(element.parent && element.parent.key && element.parent.key === element)) {
                    // just a string or number
                    token = [
                        sm.line - lastLine,
                        sm.line == lastLine ? sm.column - lastColumn: sm.column,
                        sm.endOffset - sm.offset,
                        TokensLegend.getTokenType(isStringElement(element) ? "string": "number"),
                        0
                    ];
                    tokens.push(token);
                    lastLine = sm.line;
                    lastColumn = sm.column

                }
            }
        }

    }

    traverse(buildTokens, api);
    return {
        data: tokens.flat()
    } as Proposed.SemanticTokens
}

export async function computeHover(document: TextDocument, position: Position) {
    let parser = getParser(document);

    const parseResult = await parser.parse(document.getText(), {sourceMap: true});

    const api: namespace.Element = parseResult.api
    api.freeze() // !! freeze and add parent !!

    const asyncapi: boolean = isAsyncDoc(document);

    let offset = document.offsetAt(position);
    let node = findNodeAtOffset(api, offset, true);
    let result: Hover;
    if (node.parent && isMemberElement(node.parent)) {
        const opEl: ObjectElement = (<MemberElement>node.parent).value;
        if (opEl.classes.toValue().includes('operation')) {
            const sm = getSourceMap(node);
            const httpMethod = opEl.getMetaProperty("httpMethod", 'GET').toValue();
            const path = node.parent.parent.parent.key.toValue();
            // TODO cheat now use specific ns traversion, change to use class/meta providing server url
            //const basePath = 'http://localhost:8082';
            let basePath = '';
            if (asyncapi) {
                basePath = api.servers.toValue()['prod'].url;
            } else {
                basePath = api.servers.toValue()[0].url;
            }
            const url = basePath + path;
            let hover = 'curl -X '+ httpMethod + ' ' + url;
            let hoverRange = Range.create(document.positionAt(sm.offset), document.positionAt(sm.offset + sm.length));
            result = {
                contents: ['operation', url, httpMethod, hover],
                range: hoverRange
            };
        }
        // check if we have some docs
        if (opEl.attributes.get('docs')) {
            if (result && result.contents) {
                result.contents.push(opEl.attributes.get('docs').toValue());
                //window.document.getElementById("if").src = opEl.attributes.get('docs').toValue();
            } else {
                result = {
                    contents: [opEl.attributes.get('docs').toValue()],
                    range: null
                };
            }
        }
    }
    if (result) {
        return result;
    }
    return Promise.resolve(null);
}
*/
