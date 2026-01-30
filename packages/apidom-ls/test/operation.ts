import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, Position } from 'vscode-languageserver-types';

// @ts-ignore

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';
import operationLintExpected from './fixtures/async/operation/operation-lint-expected.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specOperationLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'operation', 'operation-lint.yaml'))
  .toString();

const specOperationAction = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'operation-action.yaml'))
  .toString();

const specOperationsTypeLint = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operations-type-3-0.yaml'),
  )
  .toString();

describe('asyncapi operation test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('lint operation', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specChannelLint.yaml',
      'yaml',
      0,
      specOperationLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, operationLintExpected as Diagnostic[]);
  });

  it('complete operation action values (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-action.yaml',
      'yaml',
      0,
      specOperationAction,
    );

    const pos = Position.create(3, 11);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const sendItem = result?.items.find((item) => item.label === 'send');
    assert.isDefined(sendItem);
    assert.strictEqual(sendItem?.insertText, 'send$1');
    assert.strictEqual(sendItem?.kind, 12);

    const receiveItem = result?.items.find((item) => item.label === 'receive');
    assert.isDefined(receiveItem);
    assert.strictEqual(receiveItem?.insertText, 'receive$1');
    assert.strictEqual(receiveItem?.kind, 12);
  });

  it('lint operations type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operations-type-lint.yaml',
      'yaml',
      0,
      specOperationsTypeLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        range: {
          start: { line: 8, character: 12 },
          end: { line: 8, character: 14 },
        },
        message: 'operations must be an object',
        severity: 1,
        code: 2010700,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);
  });
});
