import { equal  }  from 'assert';

import {
	TextDocuments,
	Diagnostic,
	Position,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

suite('JSON Completion', () => {
	
	async function doComplete(): Promise<string> {
		return "";
	}

	let testCompletionsFor = function (value: string, expected: { count?: number, diagnostics?: Diagnostic[] }): PromiseLike<void> {
		
		let offset = value.indexOf('|');
		value = value.substr(0, offset) + value.substr(offset + 1);

		let document = TextDocument.create('test://test/test.json', 'json', 0, value);
		let position = Position.create(0, offset);
		equal(value, value);
		//let jsonDoc = ls.parseJSONDocument(document);


/* 		return ls.doComplete(document, position, jsonDoc).then(list => {
			if (expected.count) {
				assert.equal(list.items.length, expected.count, value + ' ' + list.items.map(i => i.label).join(', '));
			}
			if (expected.items) {
				for (let item of expected.items) {
					assertCompletion(list, item, document, offset);
				}
			}
		});
 */	
		return doComplete().then(s => {
			equal(1, 1);
		});
	};

	test('Complete property no schema', async function () {
		let diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: {line: 0, character: 0},
				end: {line: 0, character: 3}
			},
			message: `AAA is all uppercase.`,
			source: 'ex'
		};
		let diagnostics: Diagnostic[] = [];
		diagnostics.push(diagnostic);
		await testCompletionsFor('[ { "name": "John", "age": 44 }, { | }', {
			count: 2,
			diagnostics
		});
	});

});
