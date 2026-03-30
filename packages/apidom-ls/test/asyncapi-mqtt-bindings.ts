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

const bindingsPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'bindings', 'mqtt');

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specServerBindingSessionExpiryIntervalType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-session-expiry-interval-type.yaml'))
  .toString();

const specServerBindingSessionExpiryIntervalMinimum = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-session-expiry-interval-minimum.yaml'))
  .toString();

const specServerBindingMaximumPacketSizeType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-maximum-packet-size-type.yaml'))
  .toString();

const specServerBindingMaximumPacketSizeMinimum = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-maximum-packet-size-minimum.yaml'))
  .toString();

const specServerBindingKeepAliveType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-keep-alive-type.yaml'))
  .toString();

const specServerBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-server-binding-binding-version-type.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingQosEquals = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-qos-equals.yaml'))
  .toString();

const specOperationBindingRetainType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-retain-type.yaml'))
  .toString();

const specOperationBindingMessageExpiryIntervalType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-operation-binding-message-expiry-interval-type.yaml'))
  .toString();

const specOperationBindingMessageExpiryIntervalMinimum = fs
  .readFileSync(
    path.join(bindingsPath, 'mqtt-operation-binding-message-expiry-interval-minimum.yaml'),
  )
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specMessageBindingPayloadFormatIndicatorEquals = fs
  .readFileSync(
    path.join(bindingsPath, 'mqtt-message-binding-payload-format-indicator-equals.yaml'),
  )
  .toString();

const specMessageBindingContentTypeType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-content-type-type.yaml'))
  .toString();

const specMessageBindingCorrelationDataType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-correlation-data-type.yaml'))
  .toString();

const specMessageBindingResponseTopicType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-response-topic-type.yaml'))
  .toString();

const specMessageBindingResponseTopicFormatUri = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-response-topic-format-uri.yaml'))
  .toString();

const specMessageBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'mqtt-message-binding-binding-version-type.yaml'))
  .toString();

describe('asyncapi MQTT bindings test', function () {
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

  it('test MQTT server binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-allowed-fields-0-1-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test MQTT server binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-allowed-fields-0-2-0.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test MQTT server binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'sessionExpiryInterval' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-session-expiry-interval-type.yaml',
      'yaml',
      0,
      specServerBindingSessionExpiryIntervalType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 31 },
          end: { line: 10, character: 40 },
        },
        message: "'sessionExpiryInterval' must be an integer or a Schema Object",
        severity: 1,
        code: 620600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'maximumPacketSize' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-maximum-packet-size-type.yaml',
      'yaml',
      0,
      specServerBindingMaximumPacketSizeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 27 },
          end: { line: 10, character: 36 },
        },
        message: "'maximumPacketSize' must be an integer or a Schema Object",
        severity: 1,
        code: 620700,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'sessionExpiryInterval' minimum", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-session-expiry-interval-minimum.yaml',
      'yaml',
      0,
      specServerBindingSessionExpiryIntervalMinimum,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 31 },
          end: { line: 10, character: 34 },
        },
        message: "'sessionExpiryInterval' must be a non-negative integer (>=0)",
        severity: 1,
        code: 620601,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'maximumPacketSize' minimum", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-maximum-packet-size-minimum.yaml',
      'yaml',
      0,
      specServerBindingMaximumPacketSizeMinimum,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 27 },
          end: { line: 10, character: 30 },
        },
        message: "'maximumPacketSize' must be a positive integer (>=1)",
        severity: 1,
        code: 620701,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 27 },
          end: { line: 17, character: 28 },
        },
        message: "'maximumPacketSize' must be a positive integer (>=1)",
        severity: 1,
        code: 620701,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'keepAlive' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-keep-alive-type.yaml',
      'yaml',
      0,
      specServerBindingKeepAliveType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 19 },
          end: { line: 10, character: 22 },
        },
        message: "'keepAlive' must be a non-negative integer (>=0)",
        severity: 1,
        code: 620400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT server binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-server-binding-binding-version-type.yaml',
      'yaml',
      0,
      specServerBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 24 },
          end: { line: 10, character: 27 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 620500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test MQTT channel binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-channel-binding-allowed-fields-0-1-0.yaml',
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

  it('test MQTT channel binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-channel-binding-allowed-fields-0-2-0.yaml',
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

  it('test MQTT channel binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-channel-binding-allowed-fields-latest.yaml',
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

  it('test MQTT operation binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-allowed-fields-0-1-0.yaml',
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

  it('test MQTT operation binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-allowed-fields-0-2-0.yaml',
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

  it('test MQTT operation binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-allowed-fields-latest.yaml',
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

  it("test MQTT operation binding 'qos' equals", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-qos-equals.yaml',
      'yaml',
      0,
      specOperationBindingQosEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 14 },
        },
        message: "'qos' must be one of allowed values",
        severity: 1,
        code: 610100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT operation binding 'retain' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-retain-type.yaml',
      'yaml',
      0,
      specOperationBindingRetainType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 25 },
        },
        message: "'retain' value must be a boolean",
        severity: 1,
        code: 610200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT operation binding 'messageExpiryInterval' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-message-expiry-interval-type.yaml',
      'yaml',
      0,
      specOperationBindingMessageExpiryIntervalType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 31 },
          end: { line: 8, character: 40 },
        },
        message: "'messageExpiryInterval' must be an integer or a Schema Object",
        severity: 1,
        code: 610400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT operation binding 'messageExpiryInterval' minimum", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-operation-binding-message-expiry-interval-minimum.yaml',
      'yaml',
      0,
      specOperationBindingMessageExpiryIntervalMinimum,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 31 },
          end: { line: 8, character: 34 },
        },
        message: "'messageExpiryInterval' must be a non-negative integer (>=0)",
        severity: 1,
        code: 610401,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test MQTT message binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-allowed-fields-0-1-0.yaml',
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

  it('test MQTT message binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-allowed-fields-0-2-0.yaml',
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

  it('test MQTT message binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-allowed-fields-latest.yaml',
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

  it("test MQTT message binding 'payloadFormatIndicator' equals", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-payload-format-indicator-equals.yaml',
      'yaml',
      0,
      specMessageBindingPayloadFormatIndicatorEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 32 },
          end: { line: 8, character: 33 },
        },
        message: "'payloadFormatIndicator' must be one of allowed values",
        severity: 1,
        code: 600200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT message binding 'contentType' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-content-type-type.yaml',
      'yaml',
      0,
      specMessageBindingContentTypeType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 21 },
          end: { line: 8, character: 24 },
        },
        message: "'contentType' value must be a string",
        severity: 1,
        code: 600300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT message binding 'correlationData' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-correlation-data-type.yaml',
      'yaml',
      0,
      specMessageBindingCorrelationDataType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 25 },
          end: { line: 8, character: 34 },
        },
        message: "'correlationData' must be a Schema Object",
        severity: 1,
        code: 600500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT message binding 'responseTopic' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-response-topic-type.yaml',
      'yaml',
      0,
      specMessageBindingResponseTopicType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 23 },
          end: { line: 8, character: 26 },
        },
        message: "'responseTopic' must be a string or a Schema Object",
        severity: 1,
        code: 600400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT message binding 'responseTopic' format URI", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-response-topic-format-uri.yaml',
      'yaml',
      0,
      specMessageBindingResponseTopicFormatUri,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 23 },
          end: { line: 8, character: 40 },
        },
        message: "'responseTopic' must be in the format of a URI",
        severity: 1,
        code: 600600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test MQTT message binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/mqtt-message-binding-binding-version-type.yaml',
      'yaml',
      0,
      specMessageBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 24 },
          end: { line: 8, character: 27 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 600100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
