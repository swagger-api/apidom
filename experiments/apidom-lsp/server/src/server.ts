#!/usr/bin/env node

// TODO remove, keep temporarily for remote debugging
// eslint-disable-next-line import/no-duplicates
// import { appendFile } from 'fs';

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
  CodeActionKind,
  CodeAction,
  CodeActionParams,
  SymbolInformation,
} from 'vscode-languageserver';
import {
  createConnection,
  SemanticTokensRegistrationOptions,
  SemanticTokensRegistrationType,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  SemanticTokens,
  SemanticTokensParams,
  Hover,
  DocumentSymbol,
} from 'vscode-languageserver-protocol';
import { Location } from 'vscode-languageserver-types';
// eslint-disable-next-line import/no-duplicates
// import fs from 'fs';

import {
  getLanguageService,
  LanguageServiceContext,
  ValidationContext,
  CompletionContext,
  LanguageService,
  LanguageSettings,
} from '../../../../apidom/packages/apidom-ls';
import { ApidomSettings } from './server-types';
import { configuration } from './configuration';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
let languageService: LanguageService;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function log(label: string, message: unknown, toFile = false): void {
  // eslint-disable-next-line no-console
  console.log(label, JSON.stringify(message));
  /*  appendFile('/tmp/lsp.log', `${label} - ${JSON.stringify(message)}`, (err) => {
    if (err) throw err;
  }); */
  /*  if (toFile) {
    appendFile('/tmp/lsp.log', `${label} - ${JSON.stringify(message)}`, (err) => {
      if (err) throw err;
    });
  } */
}

const defaultSettings: ApidomSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ApidomSettings = defaultSettings;

function getGlobalSettings(): Thenable<ApidomSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(defaultSettings);
  }
  const settings = connection.workspace.getConfiguration({
    section: 'apidom',
  });
  if (settings) {
    return settings;
  }
  return Promise.resolve(defaultSettings);
}

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  console.log('validateTextDocument settings', JSON.stringify(globalSettings, null, 2));

  const validationContext: ValidationContext = {
    comments: DiagnosticSeverity.Error,
    // relatedInformation: hasDiagnosticRelatedInformationCapability,
    maxNumberOfProblems: globalSettings.maxNumberOfProblems,
  };

  const diagnostics = await languageService.doValidation(textDocument, validationContext);
  // Send the computed diagnostics to VSCode.
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

function reloadFromConfiguration() {
  if (languageService) {
    const settings: LanguageSettings = {
      validate: true,
      metadata: configuration(globalSettings),
    };
    languageService.configure(settings);
    documents.all().forEach(validateTextDocument);
  }
}

connection.onDidChangeConfiguration((change) => {
  console.log('change settings', JSON.stringify(change, null, 2));
  if (hasConfigurationCapability) {
    getGlobalSettings().then((s) => {
      globalSettings = s;
      console.log('changed settings', JSON.stringify(globalSettings, null, 2));
      reloadFromConfiguration();
      // Revalidate all open text documents
      documents.all().forEach(validateTextDocument);
    });
  } else {
    globalSettings = <ApidomSettings>(change.settings.apidom || defaultSettings);
    reloadFromConfiguration();
    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
  }
});

connection.onInitialize((params: InitializeParams) => {
  const { capabilities } = params;
  // log('capabilities', capabilities);
  getGlobalSettings().then((s) => {
    globalSettings = s;
    console.log('init settings', JSON.stringify(globalSettings, null, 2));
  });

  const context: LanguageServiceContext = {
    metadata: configuration(globalSettings),
  };
  languageService = getLanguageService(context);

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      // textDocumentSync: TextDocumentSyncKind.Incremental,
      textDocumentSync: TextDocumentSyncKind.Full,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false, // true TODO
      },
      hoverProvider: true,
      documentHighlightProvider: false,
      definitionProvider: true,
      referencesProvider: true,
      documentSymbolProvider: true,
      semanticTokensProvider: {
        legend: languageService.getSemanticTokensLegend(),
        range: false,
      },
    },
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }
  result.capabilities.codeActionProvider = {
    codeActionKinds: [CodeActionKind.QuickFix],
  };
  // TODO remove, keep temporarily for remote debugging
  // const notification = new NotificationType<string>('testNotification');
  // connection.sendNotification(notification, 'aaa');
  return result;
});

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  const registrationOptions: SemanticTokensRegistrationOptions = {
    documentSelector: ['apidom'],
    legend: languageService.getSemanticTokensLegend(),
    range: false,
    full: {
      delta: false,
    },
  };
  connection.client.register(SemanticTokensRegistrationType.type, registrationOptions);
});

// Only keep settings for open documents
/* documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
}); */

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
connection.onDidChangeWatchedFiles((_change) => {
  // Monitored files have change in VSCode
  connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
  async (completionParams: CompletionParams): Promise<CompletionItem[]> => {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc = documents.get(completionParams.textDocument.uri)!;
    const list = await languageService.doCompletion(doc, completionParams, completionContext);
    // if (list) console.log('completion', JSON.stringify(list.items));

    // The pass parameter contains the position of the text document in
    // which code complete got requested.
    return list ? list.items : [];
  },
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
  (item: CompletionItem): CompletionItem => {
    /*    if (item.data === 1) {
      // eslint-disable-next-line no-param-reassign
      item.detail = 'TypeScript details';
      // eslint-disable-next-line no-param-reassign
      item.documentation = 'TypeScript documentation';
    } else if (item.data === 2) {
      // eslint-disable-next-line no-param-reassign
      item.detail = 'JavaScript details';
      // eslint-disable-next-line no-param-reassign
      item.documentation = 'JavaScript documentation';
    } */
    return item;
  },
);

connection.languages.semanticTokens.on(
  async (params: SemanticTokensParams): Promise<SemanticTokens> => {
    const doc = documents.get(params.textDocument.uri)!;
    if (doc === undefined) {
      return { data: [] };
    }
    // eslint-disable-next-line no-return-await
    const tokens = await languageService.computeSemanticTokens(doc);
    // TODO remove logging below
    if (tokens.data && tokens.data.length >= 5) {
      const logBase = (n: number) => Math.log(n) / Math.log(2);
      for (let i = 0; i < tokens.data.length; i += 5) {
        // eslint-disable-next-line no-console
        console.log(
          `[${tokens.data[i]}, ${tokens.data[i + 1]}, ${tokens.data[i + 2]}, ${
            tokens.data[i + 3]
          }, ${tokens.data[i + 4]}] type: ${
            languageService.getSemanticTokensLegend().tokenTypes[tokens.data[i + 3]]
          }, mod: ${
            languageService.getSemanticTokensLegend().tokenModifiers[logBase(tokens.data[i + 4])]
          } / semTok: +line: ${tokens.data[i]}, off: ${tokens.data[i + 1]}, len: ${
            tokens.data[i + 2]
          }`,
        );
      }
    }

    return tokens;
  },
);

// TODO Complete semantic tokens
/* connection.languages.semanticTokens.on((params) => {
  const document = documents.get(params.textDocument.uri);
  if (document === undefined) {
    return { data: [] };
  }
  builder = new ProposedFeatures.SemanticTokensBuilder();
  return await languageService.computeSemanticTokens(document.getText());
  return builder.build();
});

connection.languages.semanticTokens.onEdits((params) => {
  const document = documents.get(params.textDocument.uri);
  if (document === undefined) {
    return { edits: [] };
  }
  if (builder === undefined) {
    builder = new ProposedFeatures.SemanticTokensBuilder();
  }
  builder.previousResult(params.previousResultId);
  buildTokens(builder, document);
  return builder.buildEdits();
});

connection.languages.semanticTokens.onRange((params) => {
  return { data: [] };
}); */

connection.onHover(
  async ({ textDocument, position }): Promise<Hover | undefined> => {
    const doc = documents.get(textDocument.uri)!;
    if (doc === undefined) {
      return undefined;
    }
    // eslint-disable-next-line no-return-await
    const hover = await languageService.doHover(doc, position);

    if (hover) {
      return hover;
    }
    return undefined;
  },
);

connection.onDefinition(
  async (params): Promise<Location | undefined> => {
    const doc = documents.get(params.textDocument.uri)!;
    if (doc === undefined) {
      return undefined;
    }
    // eslint-disable-next-line no-return-await
    const location = await languageService.doProvideDefinition(doc, params);

    if (location) {
      return location;
    }
    return undefined;
  },
);

connection.onReferences(
  async (params): Promise<Location[] | undefined> => {
    const doc = documents.get(params.textDocument.uri)!;
    if (doc === undefined) {
      return undefined;
    }
    // eslint-disable-next-line no-return-await
    const location = await languageService.doProvideReferences(doc, params);

    if (location) {
      return location;
    }
    return undefined;
  },
);

connection.onDocumentSymbol(
  async (params): Promise<SymbolInformation[] | undefined> => {
    const doc = documents.get(params.textDocument.uri)!;
    if (doc === undefined) {
      return undefined;
    }
    // eslint-disable-next-line no-return-await
    const symbols = await languageService.doFindDocumentSymbols(doc);

    if (symbols) {
      return symbols;
    }
    return undefined;
  },
);

async function provideCodeActions(parms: CodeActionParams): Promise<CodeAction[]> {
  if (!parms.context.diagnostics.length) {
    return [];
  }
  const document = documents.get(parms.textDocument.uri);
  if (!document) {
    return [];
  }
  const actions = await languageService.doCodeActions(document, parms);
  return actions;
}

connection.onCodeAction(provideCodeActions);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();

/*
// TODO remove, just for test
function sleepFor(sleepDuration: number) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /!* do nothing *!/
  }
}
*/

/*
function reload() {
  if (languageService) {
    const settings: LanguageSettings = {
      validate: true,
      metadata: metadata(),
    };
    // TODO remove, just for test
    sleepFor(500);
    languageService.configure(settings);
    // TODO remove, just for test
    sleepFor(500);

    documents.all().forEach(validateTextDocument);
  }
}
*/

/*
const metadataOpenapiFile =
  '/dati/dev/progetti/swagger/projects/apidom/git-lsp-new/apidom/experiments/apidom-lsp/server/src/metadata/metadataMapOpenapi.json';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadataAsyncapiFile =
  '/dati/dev/progetti/swagger/projects/apidom/git-lsp-new/apidom/experiments/apidom-lsp/server/src/metadata/metadataMapAsyncapi.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadataFunctions =
  '/dati/dev/progetti/swagger/projects/apidom/git-lsp-new/apidom/experiments/apidom-lsp/server/functions/server';

// const fsWaitOpenapi: boolean | NodeJS.Timeout = false;
// const fsWaitAsyncapi: boolean | NodeJS.Timeout = false;
// const fsWaitFunctions: boolean | NodeJS.Timeout = false;

fs.watchFile(metadataOpenapiFile, { interval: 1000 }, (curr, prev) => {
  // eslint-disable-next-line no-console
  console.log('OAS file Changed');
  log('watchFILE', 'OAS file Changed');
  reload();
});

*/
/* fs.watch(metadataOpenapiFile, (event, filename) => {
  if (filename) {
    if (fsWaitOpenapi) return;
    fsWaitOpenapi = setTimeout(() => {
      fsWaitOpenapi = false;
    }, 100);
    log('watch', `${filename} file Changed`);
    reload();
  }
});

fs.watch(metadataAsyncapiFile, (event, filename) => {
  if (filename) {
    if (fsWaitAsyncapi) return;
    fsWaitAsyncapi = setTimeout(() => {
      fsWaitAsyncapi = false;
    }, 100);
    log('watch', `${filename} file Changed`);
    reload();
  }
});

fs.watch(metadataFunctions, (event, filename) => {
  if (filename) {
    if (fsWaitFunctions) return;
    fsWaitFunctions = setTimeout(() => {
      fsWaitFunctions = false;
    }, 100);
    log('watch', `${filename} file Changed`);
    reload();
  }
}); */
