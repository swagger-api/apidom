import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

// @ts-ignore
import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specServerBindingAllowedFields010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-server-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-server-binding-allowed-fields-0-2-0.yaml',
    ),
  )
  .toString();

const specServerBindingAllowedFields030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-server-binding-allowed-fields-0-3-0.yaml',
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
      'sqs',
      'sqs-server-binding-allowed-fields-latest.yaml',
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
      'sqs',
      'sqs-channel-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-allowed-fields-0-2-0.yaml',
    ),
  )
  .toString();

const specChannelBindingAllowedFields030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-allowed-fields-0-3-0.yaml',
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
      'sqs',
      'sqs-channel-binding-allowed-fields-latest.yaml',
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
      'sqs',
      'sqs-operation-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-allowed-fields-0-2-0.yaml',
    ),
  )
  .toString();

const specOperationBindingAllowedFields030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-allowed-fields-0-3-0.yaml',
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
      'sqs',
      'sqs-operation-binding-allowed-fields-latest.yaml',
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
      'sqs',
      'sqs-message-binding-allowed-fields-0-1-0.yaml',
    ),
  )
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-message-binding-allowed-fields-0-2-0.yaml',
    ),
  )
  .toString();

const specMessageBindingAllowedFields030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-message-binding-allowed-fields-0-3-0.yaml',
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
      'sqs',
      'sqs-message-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

const specChannelBindingQueueType010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-queue--type-0-1-0.yaml',
    ),
  )
  .toString();

const specChannelBindingDeadLetterQueueType010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-dead-letter-queue--type-0-1-0.yaml',
    ),
  )
  .toString();

const specChannelBindingQueueType020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-queue--type-0-2-0.yaml',
    ),
  )
  .toString();

const specChannelBindingQueueType030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-queue--type-0-3-0.yaml',
    ),
  )
  .toString();

const specChannelBindingQueueTypeLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-queue--type-latest.yaml',
    ),
  )
  .toString();

const specChannelBindingDeadLetterQueueType020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-dead-letter-queue--type-0-2-0.yaml',
    ),
  )
  .toString();

const specChannelBindingDeadLetterQueueType030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-dead-letter-queue--type-0-3-0.yaml',
    ),
  )
  .toString();

const specChannelBindingDeadLetterQueueTypeLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-dead-letter-queue--type-latest.yaml',
    ),
  )
  .toString();

const specChannelBindingBindingVersionType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-channel-binding-binding-version--type.yaml',
    ),
  )
  .toString();

const specOperationBindingQueuesType010 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-queues--type-0-1-0.yaml',
    ),
  )
  .toString();

const specOperationBindingQueuesType020 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-queues--type-0-2-0.yaml',
    ),
  )
  .toString();

const specOperationBindingQueuesType030 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-queues--type-0-3-0.yaml',
    ),
  )
  .toString();

const specOperationBindingQueuesTypeLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-queues--type-latest.yaml',
    ),
  )
  .toString();

const specOperationBindingBindingVersionType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'sqs',
      'sqs-operation-binding-binding-version--type.yaml',
    ),
  )
  .toString();

describe('asyncapi SQS bindings test', function () {
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

  // Server binding tests

  it('test SQS server binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 9 },
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

  it('test SQS server binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 9 },
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

  it('test SQS server binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-server-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 9 },
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

  it('test SQS server binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 9 },
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

  // Channel binding tests

  it('test SQS channel binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Operation binding tests

  it('test SQS operation binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 13, character: 6 },
          end: { line: 13, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 13, character: 6 },
          end: { line: 13, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 13, character: 6 },
          end: { line: 13, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 13, character: 6 },
          end: { line: 13, character: 9 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Message binding tests

  it('test SQS message binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 10 },
          end: { line: 10, character: 13 },
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

  it('test SQS message binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 10 },
          end: { line: 10, character: 13 },
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

  it('test SQS message binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-message-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 10 },
          end: { line: 10, character: 13 },
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

  it('test SQS message binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 10 },
          end: { line: 10, character: 13 },
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

  // Channel binding type tests

  it('test SQS channel binding queue type (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-queue--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingQueueType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'queue' value must be an object",
        severity: 1,
        code: 830100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding queue type (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-queue--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingQueueType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'queue' value must be an object",
        severity: 1,
        code: 830100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding queue type (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-queue--type-0-3-0.yaml',
      'yaml',
      0,
      specChannelBindingQueueType030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'queue' value must be an object",
        severity: 1,
        code: 830100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding queue type (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-queue--type-latest.yaml',
      'yaml',
      0,
      specChannelBindingQueueTypeLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'queue' value must be an object",
        severity: 1,
        code: 830100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding deadLetterQueue type (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-dead-letter-queue--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingDeadLetterQueueType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 12, character: 25 },
          end: { line: 12, character: 28 },
        },
        message: "'deadLetterQueue' value must be an object",
        severity: 1,
        code: 830200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding deadLetterQueue type (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-dead-letter-queue--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingDeadLetterQueueType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 12, character: 25 },
          end: { line: 12, character: 28 },
        },
        message: "'deadLetterQueue' value must be an object",
        severity: 1,
        code: 830200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding deadLetterQueue type (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-dead-letter-queue--type-0-3-0.yaml',
      'yaml',
      0,
      specChannelBindingDeadLetterQueueType030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 12, character: 25 },
          end: { line: 12, character: 28 },
        },
        message: "'deadLetterQueue' value must be an object",
        severity: 1,
        code: 830200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding deadLetterQueue type (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-dead-letter-queue--type-latest.yaml',
      'yaml',
      0,
      specChannelBindingDeadLetterQueueTypeLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 12, character: 25 },
          end: { line: 12, character: 28 },
        },
        message: "'deadLetterQueue' value must be an object",
        severity: 1,
        code: 830200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS channel binding bindingVersion type', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-channel-binding-binding-version--type.yaml',
      'yaml',
      0,
      specChannelBindingBindingVersionType,
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
        code: 830300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Operation binding type tests

  it('test SQS operation binding queues type (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-queues--type-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingQueuesType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 16 },
          end: { line: 14, character: 19 },
        },
        message: "'queues' value must be an array",
        severity: 1,
        code: 850100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding queues type (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-queues--type-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingQueuesType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 16 },
          end: { line: 14, character: 19 },
        },
        message: "'queues' value must be an array",
        severity: 1,
        code: 850100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding queues type (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-queues--type-0-3-0.yaml',
      'yaml',
      0,
      specOperationBindingQueuesType030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 16 },
          end: { line: 14, character: 19 },
        },
        message: "'queues' value must be an array",
        severity: 1,
        code: 850100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding queues type (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-queues--type-latest.yaml',
      'yaml',
      0,
      specOperationBindingQueuesTypeLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 16 },
          end: { line: 14, character: 19 },
        },
        message: "'queues' value must be an array",
        severity: 1,
        code: 850100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SQS operation binding bindingVersion type', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sqs-operation-binding-binding-version--type.yaml',
      'yaml',
      0,
      specOperationBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 24 },
          end: { line: 14, character: 27 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 850200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
