import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bindingsPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'bindings', 'http');

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'http-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'http-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'http-server-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'http-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'http-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'http-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'http-channel-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'http-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingTypeType = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-type-type.yaml'))
  .toString();

const specOperationBindingMethodEquals = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-method-equals.yaml'))
  .toString();

const specOperationBindingQueryType = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-query-type.yaml'))
  .toString();

const specOperationBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'http-operation-binding-binding-version-type.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specMessageBindingHeadersType = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-headers-type.yaml'))
  .toString();

const specMessageBindingStatusCodeType = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-status-code-type.yaml'))
  .toString();

const specMessageBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'http-message-binding-binding-version-type.yaml'))
  .toString();

describe('asyncapi HTTP bindings test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  const validationContext: ValidationContext = {
    comments: DiagnosticSeverity.Error,
    maxNumberOfProblems: 100,
    relatedInformation: false,
  };

  after(function () {
    languageService.terminate();
  });

  it('http server binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http server binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http server binding - not allowed fields (v0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-server-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http channel binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http channel binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http channel binding - not allowed fields (v0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-channel-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http operation binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http operation binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http operation binding - not allowed fields (v0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http operation binding - 'type' field type (v0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-type-type.yaml',
      'yaml',
      0,
      specOperationBindingTypeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 17 },
        },
        message: "'type' value must be a string",
        severity: 1,
        code: 450100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http operation binding - 'method' field equals", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-method-equals.yaml',
      'yaml',
      0,
      specOperationBindingMethodEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 23 },
        },
        message: "'method' must be one of allowed values",
        severity: 1,
        code: 450200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http operation binding - 'query' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-query-type.yaml',
      'yaml',
      0,
      specOperationBindingQueryType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 15 },
          end: { line: 8, character: 18 },
        },
        message: 'query must be an object or a boolean JSON schema',
        severity: 1,
        code: 450300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http operation binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-operation-binding-binding-version-type.yaml',
      'yaml',
      0,
      specOperationBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 24 },
          end: { line: 9, character: 27 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 450400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http message binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http message binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http message binding - not allowed fields (v0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('http message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http message binding - 'headers' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-headers-type.yaml',
      'yaml',
      0,
      specMessageBindingHeadersType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 17 },
          end: { line: 8, character: 20 },
        },
        message: 'headers must be an object or a boolean JSON schema',
        severity: 1,
        code: 440100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http message binding - 'statusCode' field type (v0.3.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-status-code-type.yaml',
      'yaml',
      0,
      specMessageBindingStatusCodeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 20 },
          end: { line: 8, character: 29 },
        },
        message: "'statusCode' must be an integer",
        severity: 1,
        code: 440300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("http message binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/http-message-binding-binding-version-type.yaml',
      'yaml',
      0,
      specMessageBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 24 },
          end: { line: 9, character: 27 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 440200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
