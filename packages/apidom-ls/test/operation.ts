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
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-action.yaml'))
  .toString();

const specOperationAllowedFields = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-allowed-fields-3-0.yaml'),
  )
  .toString();

const specOperationRef = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-ref-3-0.yaml'),
  )
  .toString();

const specOperationRequired = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-required-3-0.yaml'),
  )
  .toString();

const specOperationMessagesType = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-messages-type-3-0.yaml'),
  )
  .toString();

const specOperationMessagesWithRef = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'operation-messages-with-ref-3-0.yaml',
    ),
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

  it('test operation allowed fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-allowed-fields.yaml',
      'yaml',
      0,
      specOperationAllowedFields,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should have 1 error for the operation with invalid fields
    assert.strictEqual(result.length, 1);

    // Error - invalidOperation has non-allowed fields
    assert.strictEqual(result[0].code, 15000); // NOT_ALLOWED_FIELDS
    assert.strictEqual(result[0].message, 'Object includes not allowed fields');
    assert.strictEqual(result[0].severity, DiagnosticSeverity.Error);
    assert.strictEqual(result[0].range.start.line, 19);
  });

  it('test operation $ref validation (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-ref.yaml',
      'yaml',
      0,
      specOperationRef,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should have errors including $ref no siblings warning
    assert.isAtLeast(result.length, 1);

    // Find the $ref with siblings error (warning)
    const refSiblingsError = result.find((r) => r.code === 2080701);
    assert.isDefined(refSiblingsError, 'Should have $ref no siblings warning');
    assert.strictEqual(
      refSiblingsError?.message,
      'All other properties in a "$ref" object are ignored',
    );
    assert.strictEqual(refSiblingsError?.severity, DiagnosticSeverity.Warning);
    assert.strictEqual(refSiblingsError?.range.start.line, 13);
  });

  it('test operation required fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-required.yaml',
      'yaml',
      0,
      specOperationRequired,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should have 4 errors: missing action/channel in 2 operations, none for $ref operation
    assert.strictEqual(result.length, 4);

    // First error - missing action (line 15)
    assert.strictEqual(result[0].code, 2080101); // ASYNCAPI3_OPERATION_FIELD_ACTION_REQUIRED
    assert.strictEqual(result[0].message, "should always have an 'action'");
    assert.strictEqual(result[0].severity, DiagnosticSeverity.Error);
    assert.strictEqual(result[0].range.start.line, 15);
    assert.isDefined(result[0].data?.quickFix);

    // Second error - missing channel (line 20)
    assert.strictEqual(result[1].code, 2080201); // ASYNCAPI3_OPERATION_FIELD_CHANNEL_REQUIRED
    assert.strictEqual(result[1].message, "should always have a 'channel'");
    assert.strictEqual(result[1].severity, DiagnosticSeverity.Error);
    assert.strictEqual(result[1].range.start.line, 20);
    assert.isDefined(result[1].data?.quickFix);

    // Third error - missing action in missingBothOperation (line 24)
    assert.strictEqual(result[2].code, 2080101); // ASYNCAPI3_OPERATION_FIELD_ACTION_REQUIRED
    assert.strictEqual(result[2].message, "should always have an 'action'");
    assert.strictEqual(result[2].severity, DiagnosticSeverity.Error);
    assert.strictEqual(result[2].range.start.line, 24);

    // Fourth error - missing channel in missingBothOperation (line 24)
    assert.strictEqual(result[3].code, 2080201); // ASYNCAPI3_OPERATION_FIELD_CHANNEL_REQUIRED
    assert.strictEqual(result[3].message, "should always have a 'channel'");
    assert.strictEqual(result[3].severity, DiagnosticSeverity.Error);
    assert.strictEqual(result[3].range.start.line, 24);

    // Verify that refOperation (with $ref) does NOT trigger required field errors
    const refOperationErrors = result.filter((r) => r.range.start.line === 27);
    assert.strictEqual(
      refOperationErrors.length,
      0,
      'Operation with $ref should not have required field errors',
    );
  });

  it('test operation messages type validation (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-messages-type.yaml',
      'yaml',
      0,
      specOperationMessagesType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 15, character: 2 },
          end: { line: 15, character: 36 },
        },
        message: "'messages' must be an array of Message Objects",
        severity: 1,
        code: 2080500,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('test operation messages with $ref does not produce false positives (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-messages-with-ref.yaml',
      'yaml',
      0,
      specOperationMessagesWithRef,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should have no errors - both $ref and inline messages are valid
    const messagesErrors = result.filter((r) => r.code === 2080500);
    assert.strictEqual(
      messagesErrors.length,
      0,
      'Should not have messages type errors when using $ref',
    );
  });
});
