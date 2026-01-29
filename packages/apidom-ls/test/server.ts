import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specServerFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'server-fields.yaml'))
  .toString();

describe('asyncapi server test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  after(function () {
    languageService.terminate();
  });

  it('complete server host field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const hostItem = result?.items.find((item) => item.label === 'host');
    assert.isDefined(hostItem);
    assert.strictEqual(hostItem?.insertText, 'host: $1');
  });

  it('complete server pathname field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const pathnameItem = result?.items.find((item) => item.label === 'pathname');
    assert.isDefined(pathnameItem);
    assert.strictEqual(pathnameItem?.insertText, 'pathname: $1');
  });

  it('complete server title and summary fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const titleItem = result?.items.find((item) => item.label === 'title');
    assert.isDefined(titleItem);
    assert.strictEqual(titleItem?.insertText, 'title: $1');

    const summaryItem = result?.items.find((item) => item.label === 'summary');
    assert.isDefined(summaryItem);
    assert.strictEqual(summaryItem?.insertText, 'summary: $1');
  });
});
