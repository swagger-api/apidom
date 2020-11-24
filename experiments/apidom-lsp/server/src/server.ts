#!/usr/bin/env node

import {
	TextDocuments,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	TextDocumentSyncKind,
	InitializeResult,
	CompletionParams,
	CompletionList,
} from 'vscode-languageserver';

import {createConnection} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';

import {validateTextDocument as myValidate, test} from "apidom-lsp";

// import {getLanguageService, LanguageServiceContext, ValidationContext, LanguageService} from 'apidom-ls';
import {getLanguageService, LanguageServiceContext, ValidationContext, CompletionContext, LanguageService} from '../../../../apidom/packages/apidom-ls';
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
let languageService: LanguageService;

connection.onInitialize((params: InitializeParams) => {
	console.log("XXXXXXXXXXXXXXXX  onInitialize");
	let capabilities = params.capabilities;

	const context: LanguageServiceContext = {};

    languageService = getLanguageService(context);

	// let doc: TextDocument = TextDocument.create('foo://bar/file.json', 'json', 0, '{"openapi": "3.0.1"}');
    // languageService.doValidation(doc, validationContext).then(result => {console.log(result);});

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			}
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The apidom settings
interface ApidomSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in ../client
// but could happen with other clients.
const defaultSettings: ApidomSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ApidomSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<ApidomSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ApidomSettings>(
			(change.settings.apidom || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ApidomSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'apidom'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	console.log("changeSS");
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// TODO we get the settings for every validate run.
	let settings = await getDocumentSettings(textDocument.uri);

	//let diagnostics = await myValidate(textDocument, settings.maxNumberOfProblems, hasDiagnosticRelatedInformationCapability);
	let aaa = await test();
	// let diagnostics = await myValidate(textDocument, settings.maxNumberOfProblems, hasDiagnosticRelatedInformationCapability);

	const validationContext: ValidationContext = {
		comments: DiagnosticSeverity.Error,
		// relatedInformation: hasDiagnosticRelatedInformationCapability,
		// maxNumberOfProblems: settings.maxNumberOfProblems
	  };

	let diagnostics = await languageService.doValidation(textDocument, validationContext);
	console.log(diagnostics);

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	async (completionParams: CompletionParams): Promise<CompletionItem[]> => {

		const completionContext: CompletionContext = {
			maxNumberOfItems: 100
		  };

		const doc = documents.get(completionParams.textDocument.uri)!;
		let list = await languageService.doCompletion(doc, completionParams, completionContext);
		if (list) console.log(list.items);

		// The pass parameter contains the position of the text document in
		// which code complete got requested.
		return list ? list.items: [];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			item.detail = 'TypeScript details';
			item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			item.detail = 'JavaScript details';
			item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
