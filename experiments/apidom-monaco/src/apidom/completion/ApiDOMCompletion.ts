
import * as Json from 'jsonc-parser';
import {openapiSchemaString} from "../validation/schema/openapiSchemaString.js";
import {asyncapiSchemaString} from "../validation/schema/asyncapiSchemaString.js";
// @ts-ignore
import ApiDOMParser from "apidom-parser";
// @ts-ignore
import * as openapi3_1Adapter from "apidom-parser-adapter-openapi3-1-json";
// @ts-ignore
import * as asyncapi2_0Adapter from "apidom-parser-adapter-asyncapi2-0-json";
import {
	allClasses,
	findAllTreeClasses,
	findAllTreeElementsWithClasses,
	findNodeAtOffset,
	getSourceMap, isBoolean, SourceMap,
	ValidationResult,
	isDefined, isNumber, isString
} from "../utils/objects";

import {
	ClientCapabilities, Diagnostic, DiagnosticSeverity, CompletionItem,
	TextDocument, CompletionList, Position, Range, CompletionsCollector,
	TextEdit, CompletionItemKind, InsertTextFormat, MarkupContent, MarkupKind
} from "../languageServiceTypes";
import $RefParser from "@apidevtools/json-schema-ref-parser";

// @ts-ignore
import {namespace} from 'apidom-parser-adapter-openapi3-1-json';

import {JSONSchema} from "../validation/schema/jsonSchema";

// @ts-ignore
import {isBooleanElement, isMemberElement, ArraySlice, isStringElement, isObjectElement, isArrayElement, isNumberElement, isNullElement} from 'apidom'
import {endsWith} from "../utils/strings";
import {stringifyObject} from "../utils/json";

const valueCommitCharacters = [',', '}', ']'];
const propertyCommitCharacters = [':'];

export class ApiDOMCompletion {

	private supportsMarkdown: boolean | undefined;
	private supportsCommitCharacters: boolean | undefined;

	constructor(
		private promiseConstructor: PromiseConstructor = Promise,
		private clientCapabilities: ClientCapabilities = {}) {
	}

	public doResolve(item: CompletionItem): Thenable<CompletionItem> {
		return this.promiseConstructor.resolve(item);
	}

	public doComplete(document: TextDocument, position: Position): Thenable<CompletionList> {

		let text: string = document.getText();
		let parser;
		let isAsync = false;
		if (text.indexOf("asyncapi") > -1) {
			isAsync = true;
		}
		if (isAsync) {
			parser = ApiDOMParser().use(asyncapi2_0Adapter);
		} else {
			parser = ApiDOMParser().use(openapi3_1Adapter);
		}
		//const parser = ApiDOMParser();

		//parser.use(openapi3_1Adapter);

		return parser.parse(text, {sourceMap: true}).then(
			result => {
				console.log("PARSER RESULT: ", result);
				//console.log("parseResult", JSON.stringify(result));
				const api: namespace.Element = result.api
				//const api: namespace.OpenApi3_1 = <namespace.OpenApi3_1>result.api;
				//namespaceAsync
				api.freeze() // !! freeze and add parent !!

				let schemaJs;
				if (isAsync) {
					schemaJs = JSON.parse(asyncapiSchemaString) as $RefParser.JSONSchema;
				} else {
					schemaJs = JSON.parse(openapiSchemaString) as $RefParser.JSONSchema;
				}

				return $RefParser.dereference(schemaJs).then(s => {
					let schema: JSONSchema = s as JSONSchema;



					let result: CompletionList = {
						items: [],
						isIncomplete: false
					};

					let offset = document.offsetAt(position);
					console.log("offset", offset);
					let node = findNodeAtOffset(api, offset, true);
					console.log("findNodeAtOffset", node.toValue());
/*
					if (this.isInComment(document, node ? node.offset : 0, offset)) {
						return Promise.resolve(result);
					}
*/
					let sm = getSourceMap(node);
					if (node && (offset === sm.offset + sm.length) && offset > 0) {
						const ch = text[offset - 1];
						if (isObjectElement(node) && ch === '}' || isArrayElement(node) && ch === ']') {
							// after ] or }
							node = node.parent;
							console.log("node = node.parent", node.toValue());
						}
					}

					sm = getSourceMap(node);
					let currentWord = this.getCurrentWord(document, offset);
					console.log("currentWord", currentWord);
					let overwriteRange = null;

					if (node && (isStringElement(node) || isNumberElement(node) || isBooleanElement(node) || isNullElement(node))) {
						overwriteRange = Range.create(document.positionAt(sm.offset), document.positionAt(sm.offset + sm.length));
					} else {
						let overwriteStart = offset - currentWord.length;
						if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
							overwriteStart--;
						}
						overwriteRange = Range.create(document.positionAt(overwriteStart), position);
					}

					const supportsCommitCharacters = false; //this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544

					let proposed: { [key: string]: CompletionItem } = {};
					let collector: CompletionsCollector = {
						add: (suggestion: CompletionItem) => {
							let label = suggestion.label;
							let existing = proposed[label];
							if (!existing) {
								label = label.replace(/[\n]/g, '↵');
								if (label.length > 60) {
									const shortendedLabel = label.substr(0, 57).trim() + '...';
									if (!proposed[shortendedLabel]) {
										label = shortendedLabel;
									}
								}
								if (overwriteRange) {
									suggestion.textEdit = TextEdit.replace(overwriteRange, suggestion.insertText);
								}
								if (supportsCommitCharacters) {
									suggestion.commitCharacters = suggestion.kind === CompletionItemKind.Property ? propertyCommitCharacters : valueCommitCharacters;
								}
								suggestion.label = label;
								proposed[label] = suggestion;
								result.items.push(suggestion);
							} else if (!existing.documentation) {
								existing.documentation = suggestion.documentation;
							}
						},
						setAsIncomplete: () => {
							result.isIncomplete = true;
						},
						error: (message: string) => {
							console.error(message);
						},
						log: (message: string) => {
							console.log(message);
						},
						getNumberOfProposals: () => {
							return result.items.length;
						}
					};

					let collectionPromises: Thenable<any>[] = [];

					let addValue = true;
					let currentKey = '';

					let currentProperty: namespace.Element = null;
					if (node) {
						if (isStringElement(node)) {
							let parent = node.parent;
							if (parent && isMemberElement(parent) && parent.key === node) {
								addValue = !parent.value;
								currentProperty = parent;
								currentKey = text.substr(sm.offset + 1, sm.length - 2);
								if (parent) {
									node = parent.parent;
								}
							}
						}
					}
					if (node) {
						sm = getSourceMap(node);
					}

					// proposals for properties
					if (node && isObjectElement(node)) {
						// don't suggest keys when the cursor is just before the opening curly brace
						if (sm.offset === offset) {
							return result;
						}
						// don't suggest properties that are already present

						for (let p of node) {
							if (!currentProperty || currentProperty !== p) {
								proposed[p.key.toValue()] = CompletionItem.create('__');
							}
						}
						let separatorAfter = '';
						if (addValue) {
							separatorAfter = this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
						}

						if (schema) {
							// property proposals with schema
							console.log("getPropertyCompletions", node.toValue());
							this.getPropertyCompletions(schema, api, node, addValue, separatorAfter, collector);
						} else {
							// property proposals without schema
							//this.getSchemaLessPropertyCompletions(api, node, currentKey, collector);
						}

/*
						if ((!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"')) {
							collector.add({
								kind: CompletionItemKind.Property,
								label: this.getLabelForValue(currentWord),
								insertText: this.getInsertTextForProperty(currentWord, null, false, separatorAfter),
								insertTextFormat: InsertTextFormat.Snippet, documentation: '',
							});
							collector.setAsIncomplete();
						}
*/
					}

					// proposals for values
					let types: { [type: string]: boolean } = {};
					if (schema) {
						// value proposals with schema
						//this.getValueCompletions(schema, api, node, offset, document, collector, types);
					} else {
						// value proposals without schema
						//this.getSchemaLessValueCompletions(api, node, offset, document, collector);
					}

					if (node) {
						sm = getSourceMap(node);
					}
					return this.promiseConstructor.all(collectionPromises).then(() => {
						if (collector.getNumberOfProposals() === 0) {
							let offsetForSeparator = offset;

							if (node && (isStringElement(node) || isNumberElement(node) || isBooleanElement(node) || isNullElement(node))) {
								offsetForSeparator = sm.offset + sm.length;
							}
							let separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
							this.addFillerValueCompletions(types, separatorAfter, collector);
						}
						return result;
					});

				});
			}
		);



	}



	private buildMatchingSchemas(schema: any, node: namespace.Element, mss: Map<namespace.Element, any>) {
		console.log('build', node.toValue(), schema);
		mss.set(node, schema);
/*
		let ms : MatchingSchema = new MatchingSchema();
		ms.node = node;
		ms.schema = schema;
		mss.push(ms);
		var myMap = new Map();
*/

		let seenKeys: { [key: string]: namespace.Element } = Object.create(null);
		let unprocessedProperties: string[] = [];
		if (isObjectElement(node)) {
			for (const propertyNode of node) {
				let key = propertyNode.key.toValue();
				seenKeys[key] = propertyNode.value;
				unprocessedProperties.push(key);
			}
		}

		let propertyProcessed = (prop: string) => {
			let index = unprocessedProperties.indexOf(prop);
			while (index >= 0) {
				unprocessedProperties.splice(index, 1);
				index = unprocessedProperties.indexOf(prop);
			}
		};

		if (schema.properties) {
			for (const propertyName of Object.keys(schema.properties)) {
				propertyProcessed(propertyName);
				let propertySchema = schema.properties[propertyName];
				let child = seenKeys[propertyName];

				if (child) {
					this.buildMatchingSchemas(propertySchema, child, mss);
				}
			}
		}

	}

	private getPropertyCompletions(schema: JSONSchema, doc: namespace.Element, node: namespace.Element, addValue: boolean, separatorAfter: string, collector: CompletionsCollector): void {

		let mss: Map<namespace.Element, any> = new Map();
		this.buildMatchingSchemas(schema, doc, mss);
		console.log("mss", mss);
		let sm: SourceMap = getSourceMap(node);;
		//let matchingSchemas = doc.getMatchingSchemas(schema, sm.offset);
		const nodeSchema = mss.get(node);

		let schemaProperties = nodeSchema.properties;
		if (schemaProperties) {
			Object.keys(schemaProperties).forEach((key: string) => {
				let propertySchema = schemaProperties[key];
				if (typeof propertySchema === 'object' && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
					let proposal: CompletionItem = {
						kind: CompletionItemKind.Property,
						label: key,
						insertText: this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
						insertTextFormat: InsertTextFormat.Snippet,
						filterText: this.getFilterTextForValue(key),
						documentation: this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || '',
					};
					if (endsWith(proposal.insertText, `$1${separatorAfter}`)) {
						proposal.command = {
							title: 'Suggest',
							command: 'editor.action.triggerSuggest'
						};
					}
					collector.add(proposal);
				}
			});
		}
	}




	private collectTypes(schema: JSONSchema, types: { [type: string]: boolean }) {
		if (Array.isArray(schema.enum) || isDefined(schema.const)) {
			return;
		}
		let type = schema.type;
		if (Array.isArray(type)) {
			type.forEach(t => types[t] = true);
		} else {
			types[type] = true;
		}
	}

	private addFillerValueCompletions(types: { [type: string]: boolean }, separatorAfter: string, collector: CompletionsCollector): void {
		if (types['object']) {
			collector.add({
				kind: this.getSuggestionKind('object'),
				label: '{}',
				insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				detail: 'New object',
				documentation: ''
			});
		}
		if (types['array']) {
			collector.add({
				kind: this.getSuggestionKind('array'),
				label: '[]',
				insertText: this.getInsertTextForGuessedValue([], separatorAfter),
				insertTextFormat: InsertTextFormat.Snippet,
				detail: 'New Array',
				documentation: ''
			});
		}
	}

	private addBooleanValueCompletion(value: boolean, separatorAfter: string, collector: CompletionsCollector): void {
		collector.add({
			kind: this.getSuggestionKind('boolean'),
			label: value ? 'true' : 'false',
			insertText: this.getInsertTextForValue(value, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: ''
		});
	}

	private addNullValueCompletion(separatorAfter: string, collector: CompletionsCollector): void {
		collector.add({
			kind: this.getSuggestionKind('null'),
			label: 'null',
			insertText: 'null' + separatorAfter,
			insertTextFormat: InsertTextFormat.Snippet,
			documentation: ''
		});
	}

	private addDollarSchemaCompletions(separatorAfter: string, collector: CompletionsCollector): void {
/*
		let schemaIds = this.schemaService.getRegisteredSchemaIds(schema => schema === 'http' || schema === 'https');
		schemaIds.forEach(schemaId => collector.add({
			kind: CompletionItemKind.Module,
			label: this.getLabelForValue(schemaId),
			filterText: this.getFilterTextForValue(schemaId),
			insertText: this.getInsertTextForValue(schemaId, separatorAfter),
			insertTextFormat: InsertTextFormat.Snippet, documentation: ''
		}));
*/
	}

	private getLabelForValue(value: any): string {
		return JSON.stringify(value);
	}

	private getFilterTextForValue(value): string {
		return JSON.stringify(value);
	}

	private getFilterTextForSnippetValue(value): string {
		return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
	}

	private getLabelForSnippetValue(value: any): string {
		let label = JSON.stringify(value);
		return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
	}

	private getInsertTextForPlainText(text: string): string {
		return text.replace(/[\\\$\}]/g, '\\$&');   // escape $, \ and }
	}

	private getInsertTextForValue(value: any, separatorAfter: string): string {
		var text = JSON.stringify(value, null, '\t');
		if (text === '{}') {
			return '{$1}' + separatorAfter;
		} else if (text === '[]') {
			return '[$1]' + separatorAfter;
		}
		return this.getInsertTextForPlainText(text + separatorAfter);
	}

	private getInsertTextForSnippetValue(value: any, separatorAfter: string): string {
		let replacer = (value) => {
			if (typeof value === 'string') {
				if (value[0] === '^') {
					return value.substr(1);
				}
			}
			return JSON.stringify(value);
		};
		return stringifyObject(value, '', replacer) + separatorAfter;
	}

	private templateVarIdCounter = 0;

	private getInsertTextForGuessedValue(value: any, separatorAfter: string): string {
		switch (typeof value) {
			case 'object':
				if (value === null) {
					return '${1:null}' + separatorAfter;
				}
				return this.getInsertTextForValue(value, separatorAfter);
			case 'string':
				let snippetValue = JSON.stringify(value);
				snippetValue = snippetValue.substr(1, snippetValue.length - 2); // remove quotes
				snippetValue = this.getInsertTextForPlainText(snippetValue); // escape \ and }
				return '"${1:' + snippetValue + '}"' + separatorAfter;
			case 'number':
			case 'boolean':
				return '${1:' + JSON.stringify(value) + '}' + separatorAfter;
		}
		return this.getInsertTextForValue(value, separatorAfter);
	}

	private getSuggestionKind(type: any): CompletionItemKind {
		if (Array.isArray(type)) {
			let array = <any[]>type;
			type = array.length > 0 ? array[0] : null;
		}
		if (!type) {
			return CompletionItemKind.Value;
		}
		switch (type) {
			case 'string': return CompletionItemKind.Value;
			case 'object': return CompletionItemKind.Module;
			case 'property': return CompletionItemKind.Property;
			default: return CompletionItemKind.Value;
		}
	}

	private getLabelTextForMatchingNode(node: namespace.Element, document: TextDocument): string {
		if (isObjectElement(node)) {
			return '{}';
		} else if (isArrayElement(node)) {
			return '[]';
		}
		const sm = getSourceMap(node);
		let content = document.getText().substr(sm.offset, sm.length);
		return content;
	}

	private getInsertTextForMatchingNode(node: namespace.Element, document: TextDocument, separatorAfter: string): string {

		if (isObjectElement(node)) {
			return this.getInsertTextForValue({}, separatorAfter);
		} else if (isArrayElement(node)) {
			return this.getInsertTextForValue([], separatorAfter);
		}
		const sm = getSourceMap(node);
		let content = document.getText().substr(sm.offset, sm.length) + separatorAfter;
		return this.getInsertTextForPlainText(content);
	}

	private getInsertTextForProperty(key: string, propertySchema: JSONSchema, addValue: boolean, separatorAfter: string): string {

		let propertyText = this.getInsertTextForValue(key, '');
		if (!addValue) {
			return propertyText;
		}
		let resultText = propertyText + ': ';

		let value;
		let nValueProposals = 0;
		if (propertySchema) {
			if (Array.isArray(propertySchema.defaultSnippets)) {
				if (propertySchema.defaultSnippets.length === 1) {
					let body = propertySchema.defaultSnippets[0].body;
					if (isDefined(body)) {
						value = this.getInsertTextForSnippetValue(body, '');
					}
				}
				nValueProposals += propertySchema.defaultSnippets.length;
			}
			if (propertySchema.enum) {
				if (!value && propertySchema.enum.length === 1) {
					value = this.getInsertTextForGuessedValue(propertySchema.enum[0], '');
				}
				nValueProposals += propertySchema.enum.length;
			}
			if (isDefined(propertySchema.default)) {
				if (!value) {
					value = this.getInsertTextForGuessedValue(propertySchema.default, '');
				}
				nValueProposals++;
			}
			if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
				if (!value) {
					value = this.getInsertTextForGuessedValue(propertySchema.examples[0], '');
				}
				nValueProposals += propertySchema.examples.length;
			}
			if (nValueProposals === 0) {
				var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
				if (!type) {
					if (propertySchema.properties) {
						type = 'object';
					} else if (propertySchema.items) {
						type = 'array';
					}
				}
				switch (type) {
					case 'boolean':
						value = '$1';
						break;
					case 'string':
						value = '"$1"';
						break;
					case 'object':
						value = '{$1}';
						break;
					case 'array':
						value = '[$1]';
						break;
					case 'number':
					case 'integer':
						value = '${1:0}';
						break;
					case 'null':
						value = '${1:null}';
						break;
					default:
						return propertyText;
				}
			}
		}
		if (!value || nValueProposals > 1) {
			value = '$1';
		}
		return resultText + value + separatorAfter;
	}

	private getCurrentWord(document: TextDocument, offset: number) {
		var i = offset - 1;
		var text = document.getText();
		while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
			i--;
		}
		return text.substring(i + 1, offset);
	}

	private evaluateSeparatorAfter(document: TextDocument, offset: number) {
		let scanner = Json.createScanner(document.getText(), true);
		scanner.setPosition(offset);
		let token = scanner.scan();
		switch (token) {
			case 5:
			case 2:
			case 4:
			case 17:
				return '';
			default:
				return ',';
		}
	}

	private findItemAtOffset(node: namespace.Element, document: TextDocument, offset: number) {
		let scanner = Json.createScanner(document.getText(), true);
		let children = node.children;
		for (let i = children.length - 1; i >= 0; i--) {
			let child = children[i];
			const sm = getSourceMap(child);
			if (offset > sm.offset + sm.length) {
				scanner.setPosition(sm.offset + sm.length);
				let token = scanner.scan();
				if (token === Json.SyntaxKind.CommaToken && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
					return i + 1;
				}
				return i;
			} else if (offset >= sm.offset) {
				return i;
			}
		}
		return 0;
	}

	private isInComment(document: TextDocument, start: number, offset: number) {
		let scanner = Json.createScanner(document.getText(), false);
		scanner.setPosition(start);
		let token = scanner.scan();
		while (token !== Json.SyntaxKind.EOF && (scanner.getTokenOffset() + scanner.getTokenLength() < offset)) {
			token = scanner.scan();
		}
		return (token === Json.SyntaxKind.LineCommentTrivia || token === Json.SyntaxKind.BlockCommentTrivia) && scanner.getTokenOffset() <= offset;
	}

	private fromMarkup(markupString: string | undefined): MarkupContent | string | undefined {
		if (markupString && this.doesSupportMarkdown()) {
			return {
				kind: MarkupKind.Markdown,
				value: markupString
			};
		}
		return undefined;
	}

	private doesSupportMarkdown() {
		if (!isDefined(this.supportsMarkdown)) {
			const completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
			this.supportsMarkdown = completion && completion.completionItem && Array.isArray(completion.completionItem.documentationFormat) && completion.completionItem.documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
		}
		return this.supportsMarkdown;
	}

	private doesSupportsCommitCharacters() {
		if (!isDefined(this.supportsCommitCharacters)) {
			const completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
			this.supportsCommitCharacters = completion && completion.completionItem && !!completion.completionItem.commitCharactersSupport;
		}
		return this.supportsCommitCharacters;
	}

}

export class MatchingSchema {
	schema: JSONSchema
	node: Element
}
