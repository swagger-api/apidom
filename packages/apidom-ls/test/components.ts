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

const specComponentsFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'components-fields.yaml'))
  .toString();

describe('asyncapi components test', function () {
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

  it('complete components operations field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const operationsItem = result?.items.find((item) => item.label === 'operations');
    assert.isDefined(operationsItem);
    assert.strictEqual(operationsItem?.insertText, 'operations: \n  $1');
  });

  it('complete components replies field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const repliesItem = result?.items.find((item) => item.label === 'replies');
    assert.isDefined(repliesItem);
    assert.strictEqual(repliesItem?.insertText, 'replies: \n  $1');
  });

  it('complete components replyAddresses field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const replyAddressesItem = result?.items.find((item) => item.label === 'replyAddresses');
    assert.isDefined(replyAddressesItem);
    assert.strictEqual(replyAddressesItem?.insertText, 'replyAddresses: \n  $1');
  });

  it('complete components tags and externalDocs fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const tagsItem = result?.items.find((item) => item.label === 'tags');
    assert.isDefined(tagsItem);
    assert.strictEqual(tagsItem?.insertText, 'tags: \n  $1');

    const externalDocsItem = result?.items.find((item) => item.label === 'externalDocs');
    assert.isDefined(externalDocsItem);
    assert.strictEqual(externalDocsItem?.insertText, 'externalDocs: \n  $1');
  });
});
