import * as child_process from 'child_process';
import * as assert from 'assert';
import { TextDocumentSyncKind, MarkupKind } from 'vscode-languageserver';

const lspProcess = child_process.fork('out/server.js', ['--node-ipc']);
let messageId = 1;

function request(method: string, params: unknown): number {
  const message = {
    jsonrpc: '2.0',
    id: messageId,
    method,
    params,
  };
  lspProcess.send(message);
  messageId += 1;
  return messageId - 1;
}

function notification(method: string, params: any) {
  const message = {
    jsonrpc: '2.0',
    method,
    params,
  };
  lspProcess.send(message);
}

function initialize(): number {
  return request('initialize', {
    rootPath: process.cwd(),
    processId: process.pid,
    capabilities: {
      textDocument: {
        completion: {
          completionItem: {
            deprecatedSupport: true,
            documentationFormat: [MarkupKind.Markdown],
            snippetSupport: true,
          },
        },
        hover: {
          contentFormat: [MarkupKind.PlainText],
        },
        codeAction: {},
        semanticTokens: {
          formats: [],
          requests: {
            full: {
              delta: false,
            },
          },
          tokenModifiers: [],
          tokenTypes: [],
        },
      },
      workspace: {
        applyEdit: false,
        workspaceEdit: {
          documentChanges: true,
        },
      },
    },
  });
}

describe('ApiDOM LSP Tests', function () {
  it('initialize', function (finished) {
    const responseId = initialize();
    lspProcess.once('message', function (json) {
      assert.strictEqual(json.id, responseId);
      const { capabilities } = json.result;
      assert.strictEqual(capabilities.textDocumentSync, TextDocumentSyncKind.Full);
      assert.strictEqual(capabilities.codeActionProvider.codeActionKinds[0], 'quickfix');
      assert.strictEqual(capabilities.completionProvider.resolveProvider, false);
      assert.strictEqual(capabilities.executeCommandProvider, undefined);
      assert.strictEqual(capabilities.foldingRangeProvider, undefined);
      assert.strictEqual(capabilities.hoverProvider, true);
      assert.strictEqual(capabilities.renameProvider, undefined);
      assert.strictEqual(capabilities.semanticTokensProvider.range, false);
      finished();
    });
  });

  it('initialized', function () {
    notification('initialized', {});
  });

  it('hover', function (finished) {
    /*
    notification('workspace/didChangeConfiguration', {
      settings: {
        apidom: {
          OpenApi: {
            metadataFile: '/tmp/a',
          },
        },
      },
    });
*/
    notification('textDocument/didOpen', {
      textDocument: {
        languageId: 'apidom',
        version: 1,
        uri: 'uri://apidom/oas.json',
        text: '{"openapi": "3.1.0"}',
      },
    });
    const id = request('textDocument/hover', {
      textDocument: {
        uri: 'uri://apidom/oas.json',
      },
      position: {
        line: 0,
        character: 1,
      },
    });
    lspProcess.on('message', (json) => {
      if (json.id === id) {
        assert.strictEqual(json.result.contents.kind, MarkupKind.Markdown);
        assert.strictEqual(json.result.contents.value, '**openapi**\n');
        finished();
      }
    });
  });

  it('semantic tokens', function (finished) {
    notification('textDocument/didOpen', {
      textDocument: {
        languageId: 'apidom',
        version: 1,
        uri: 'uri://apidom/oas.json',
        text: '{"openapi": "3.1.0"}',
      },
    });
    const id = request('textDocument/semanticTokens/full', {
      textDocument: {
        uri: 'uri://apidom/oas.json',
      },
    });

    lspProcess.on('message', (json) => {
      if (json.id === id) {
        assert.notStrictEqual(json.result.data, [0, 1, 9, 15, 0]);
        finished();
      }
    });
  });

  after(() => {
    lspProcess.kill();
  });
});
