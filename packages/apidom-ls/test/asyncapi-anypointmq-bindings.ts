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

const specChannelBindingAllowedFields001 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-channel-binding-allowed-fields-0-0-1.yaml',
    ),
  )
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-channel-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-channel-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

const specChannelBindingDestinationType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-channel-binding-destination-type.yaml',
    ),
  )
  .toString();

const specChannelBindingDestinationTypeType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-channel-binding-destination-type-type.yaml',
    ),
  )
  .toString();

const specMessageBindingAllowedFields001 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-message-binding-allowed-fields-0-0-1.yaml',
    ),
  )
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-message-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-message-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

const specMessageBindingHeadersType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-message-binding-headers-type.yaml',
    ),
  )
  .toString();

const specOperationBindingAllowedFields001 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-operation-binding-allowed-fields-0-0-1.yaml',
    ),
  )
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-operation-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-operation-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

const specServerBindingAllowedFields001 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-server-binding-allowed-fields-0-0-1.yaml',
    ),
  )
  .toString();

const specServerBindingAllowedFields010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-server-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'anypointmq-server-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

describe('asyncapi anypointmq bindings test', function () {
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

  const validationContext: ValidationContext = {
    comments: DiagnosticSeverity.Error,
    maxNumberOfProblems: 100,
    relatedInformation: false,
  };

  it('anypointmq channel binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-channel-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields001,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq channel binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq channel binding - destination field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-channel-binding-destination-type.yaml',
      'yaml',
      0,
      specChannelBindingDestinationType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 21 },
          end: { line: 8, character: 24 },
        },
        message: "'destination' value must be a string",
        severity: 1,
        code: 1070200,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq channel binding - destinationType field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-channel-binding-destination-type-type.yaml',
      'yaml',
      0,
      specChannelBindingDestinationTypeType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 25 },
          end: { line: 8, character: 28 },
        },
        message: "'destinationType' value must be a string",
        severity: 1,
        code: 1070300,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq message binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-message-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields001,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq message binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq message binding - headers field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-message-binding-headers-type.yaml',
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
        code: 1080100,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('anypointmq operation binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-operation-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields001,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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

  it('anypointmq operation binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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

  it('anypointmq operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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

  it('anypointmq server binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-server-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields001,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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

  it('anypointmq server binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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

  it('anypointmq server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/anypointmq-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 16 },
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
});
