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

const bindingsPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'bindings', 'amqp');

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-server-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'amqp-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingIsEquals = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-is-equals.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specMessageBindingContentEncodingType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-content-encoding-type.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingDeliveryModeEquals = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-delivery-mode-equals.yaml'))
  .toString();

const specChannelBindingExchangeType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-exchange-type.yaml'))
  .toString();

const specChannelBindingQueueType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-channel-binding-queue-type.yaml'))
  .toString();

const specMessageBindingMessageTypeType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-message-binding-message-type-type.yaml'))
  .toString();

const specOperationBindingExpirationType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-expiration-type.yaml'))
  .toString();

const specOperationBindingUserIdType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-user-id-type.yaml'))
  .toString();

const specOperationBindingCcType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-cc-type.yaml'))
  .toString();

const specOperationBindingPriorityType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-priority-type.yaml'))
  .toString();

const specOperationBindingMandatoryType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-mandatory-type.yaml'))
  .toString();

const specOperationBindingBccType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-bcc-type.yaml'))
  .toString();

const specOperationBindingReplyToType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-reply-to-type.yaml'))
  .toString();

const specOperationBindingTimestampType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-timestamp-type.yaml'))
  .toString();

const specOperationBindingAckType = fs
  .readFileSync(path.join(bindingsPath, 'amqp-operation-binding-ack-type.yaml'))
  .toString();

describe('asyncapi AMQP bindings test', function () {
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

  it('amqp server binding - not allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 10 },
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

  it('amqp server binding - not allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 10 },
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

  it('amqp server binding - not allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-server-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 10 },
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

  it('amqp server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 10 },
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

  it('amqp channel binding - not allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-allowed-fields-0-1-0.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp channel binding - not allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-allowed-fields-0-2-0.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp channel binding - not allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-allowed-fields-0-3-0.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp channel binding - 'is' field must be one of allowed values (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-is-equals.yaml',
      'yaml',
      0,
      specChannelBindingIsEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 12 },
          end: { line: 8, character: 24 },
        },
        message: "'is' must be one of allowed values",
        severity: 1,
        code: 320100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp message binding - not allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-allowed-fields-0-1-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp message binding - not allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-allowed-fields-0-2-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp message binding - not allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-allowed-fields-0-3-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp message binding - 'contentEncoding' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-content-encoding-type.yaml',
      'yaml',
      0,
      specMessageBindingContentEncodingType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 25 },
          end: { line: 8, character: 28 },
        },
        message: "'contentEncoding' value must be a string",
        severity: 1,
        code: 330100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp operation binding - not allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-allowed-fields-0-1-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp operation binding - not allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-allowed-fields-0-2-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp operation binding - replyTo not allowed in 0.3.0', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-allowed-fields-0-3-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('amqp operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'deliveryMode' must be one of allowed values (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-delivery-mode-equals.yaml',
      'yaml',
      0,
      specOperationBindingDeliveryModeEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 22 },
          end: { line: 8, character: 23 },
        },
        message: "'deliveryMode' must be one of allowed values",
        severity: 1,
        code: 340500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp channel binding - 'exchange' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-exchange-type.yaml',
      'yaml',
      0,
      specChannelBindingExchangeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 18 },
          end: { line: 8, character: 21 },
        },
        message: "'exchange' value must be an object",
        severity: 1,
        code: 320200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp channel binding - 'queue' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-channel-binding-queue-type.yaml',
      'yaml',
      0,
      specChannelBindingQueueType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 15 },
          end: { line: 8, character: 18 },
        },
        message: "'queue' value must be an object",
        severity: 1,
        code: 320300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp message binding - 'messageType' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-message-binding-message-type-type.yaml',
      'yaml',
      0,
      specMessageBindingMessageTypeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 21 },
          end: { line: 8, character: 24 },
        },
        message: "'messageType' value must be a string",
        severity: 1,
        code: 330200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'expiration' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-expiration-type.yaml',
      'yaml',
      0,
      specOperationBindingExpirationType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 20 },
          end: { line: 8, character: 23 },
        },
        message: "'expiration' must be a non-negative integer",
        severity: 1,
        code: 340100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'userId' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-user-id-type.yaml',
      'yaml',
      0,
      specOperationBindingUserIdType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 19 },
        },
        message: "'userId' value must be a string",
        severity: 1,
        code: 340200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'cc' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-cc-type.yaml',
      'yaml',
      0,
      specOperationBindingCcType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: "'cc' must be an array of strings",
        severity: 1,
        code: 340300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'priority' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-priority-type.yaml',
      'yaml',
      0,
      specOperationBindingPriorityType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 18 },
          end: { line: 8, character: 21 },
        },
        message: "'priority' must be an integer",
        severity: 1,
        code: 340400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'mandatory' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-mandatory-type.yaml',
      'yaml',
      0,
      specOperationBindingMandatoryType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'mandatory' value must be a boolean",
        severity: 1,
        code: 340600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'bcc' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-bcc-type.yaml',
      'yaml',
      0,
      specOperationBindingBccType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 10 },
        },
        message: "'bcc' must be an array of strings",
        severity: 1,
        code: 340700,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'replyTo' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-reply-to-type.yaml',
      'yaml',
      0,
      specOperationBindingReplyToType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 17 },
          end: { line: 8, character: 20 },
        },
        message: "'replyTo' value must be a string",
        severity: 1,
        code: 340800,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'timestamp' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-timestamp-type.yaml',
      'yaml',
      0,
      specOperationBindingTimestampType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'timestamp' value must be a boolean",
        severity: 1,
        code: 340900,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("amqp operation binding - 'ack' field type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/amqp-operation-binding-ack-type.yaml',
      'yaml',
      0,
      specOperationBindingAckType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 16 },
        },
        message: "'ack' value must be a boolean",
        severity: 1,
        code: 350000,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
