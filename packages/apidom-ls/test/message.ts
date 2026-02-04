import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specMessageAllowedFields = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-allowed-fields-3-0.yaml'),
  )
  .toString();

const specMessageHeadersType = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-headers-type-3-0.yaml'),
  )
  .toString();

const specMessagePayloadType = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-payload-type-3-0.yaml'),
  )
  .toString();

describe('asyncapi message test', function () {
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

  it('test message allowed fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-allowed-fields.yaml',
      'yaml',
      0,
      specMessageAllowedFields,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 1);

    const notAllowedError = result.find((r) => r.code === 15000);
    assert.isDefined(notAllowedError, 'Should have not allowed fields error');
    assert.strictEqual(notAllowedError?.message, 'Object includes not allowed fields');
    assert.strictEqual(notAllowedError?.severity, DiagnosticSeverity.Error);
  });

  it('test message headers type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-headers-type.yaml',
      'yaml',
      0,
      specMessageHeadersType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 1);

    const headersTypeError = result.find((r) => r.code === 2150100);
    assert.isDefined(headersTypeError, 'Should have headers type error');
    assert.strictEqual(headersTypeError?.code, 2150100);
    assert.strictEqual(
      headersTypeError?.message,
      "'headers' must be a Multi Format Schema Object or a Schema Object",
    );
    assert.strictEqual(headersTypeError?.severity, DiagnosticSeverity.Error);
  });

  it('test message payload type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-payload-type.yaml',
      'yaml',
      0,
      specMessagePayloadType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 1);

    const payloadTypeError = result.find((r) => r.code === 2150200);
    assert.isDefined(payloadTypeError, 'Should have payload type error');
    assert.strictEqual(payloadTypeError?.code, 2150200);
    assert.strictEqual(
      payloadTypeError?.message,
      "'payload' must be a Multi Format Schema Object or a Schema Object",
    );
    assert.strictEqual(payloadTypeError?.severity, DiagnosticSeverity.Error);
  });
});
