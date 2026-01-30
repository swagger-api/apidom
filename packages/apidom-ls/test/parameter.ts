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

const specParameterFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'parameter-fields.yaml'))
  .toString();

describe('asyncapi parameter test', function () {
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

  it('complete parameter enum field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-fields.yaml',
      'yaml',
      0,
      specParameterFields,
    );

    const pos = Position.create(5, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const enumItem = result?.items.find((item) => item.label === 'enum');
    assert.isDefined(enumItem);
    assert.strictEqual(enumItem?.insertText, 'enum: \n  - $1');
  });

  it('complete parameter default and examples fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-fields.yaml',
      'yaml',
      0,
      specParameterFields,
    );

    const pos = Position.create(5, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const defaultItem = result?.items.find((item) => item.label === 'default');
    assert.isDefined(defaultItem);
    assert.strictEqual(defaultItem?.insertText, 'default: $1');

    const examplesItem = result?.items.find((item) => item.label === 'examples');
    assert.isDefined(examplesItem);
    assert.strictEqual(examplesItem?.insertText, 'examples: \n  - $1');
  });
});
