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

const bindingsPath = path.join(
  __dirname,
  'fixtures',
  'validation',
  'asyncapi',
  'bindings',
  'kafka',
);

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specServerBindingAllowedFields040 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-0-4-0.yaml'))
  .toString();

const specServerBindingAllowedFields050 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-0-5-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specServerBindingSchemaRegistryUrlFormatUri = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-schema-registry-url-format-uri.yaml'))
  .toString();

const specServerBindingSchemaRegistryVendorType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-schema-registry-vendor-type.yaml'))
  .toString();

const specServerBindingSchemaRegistryVendorExcluded = fs
  .readFileSync(
    path.join(bindingsPath, 'kafka-server-binding-schema-registry-vendor-excluded.yaml'),
  )
  .toString();

const specServerBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-server-binding-binding-version-type.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specChannelBindingAllowedFields040 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-0-4-0.yaml'))
  .toString();

const specChannelBindingAllowedFields050 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-0-5-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingTopicType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-topic-type.yaml'))
  .toString();

const specChannelBindingReplicasPartitionsType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-replicas-partitions-type.yaml'))
  .toString();

const specChannelBindingTopicConfigurationType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-topic-configuration-type.yaml'))
  .toString();

const specChannelBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-channel-binding-binding-version-type.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specOperationBindingAllowedFields040 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-0-4-0.yaml'))
  .toString();

const specOperationBindingAllowedFields050 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-0-5-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingGroupIdType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-group-id-type.yaml'))
  .toString();

const specOperationBindingClientIdType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-client-id-type.yaml'))
  .toString();

const specOperationBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-operation-binding-binding-version-type.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFields030 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-0-3-0.yaml'))
  .toString();

const specMessageBindingAllowedFields040 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-0-4-0.yaml'))
  .toString();

const specMessageBindingAllowedFields050 = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-0-5-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specMessageBindingKeyType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-key-type.yaml'))
  .toString();

const specMessageBindingSchemaIdLocationType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-schema-id-location-type.yaml'))
  .toString();

const specMessageBindingSchemaIdPayloadEncodingType = fs
  .readFileSync(
    path.join(bindingsPath, 'kafka-message-binding-schema-id-payload-encoding-type.yaml'),
  )
  .toString();

const specMessageBindingSchemaLookupStrategyType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-schema-lookup-strategy-type.yaml'))
  .toString();

const specMessageBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'kafka-message-binding-binding-version-type.yaml'))
  .toString();

describe('asyncapi Kafka bindings test', function () {
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

  it('test Kafka server binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
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

  it('test Kafka server binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
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

  it('test Kafka server binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka server binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields040,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka server binding allowed fields (0.5.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-0-5-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields050,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka server binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
        },
        message: 'Object includes not allowed fields.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka server binding 'schemaRegistryUrl' format URI", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-schema-registry-url-format-uri.yaml',
      'yaml',
      0,
      specServerBindingSchemaRegistryUrlFormatUri,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 27 },
          end: { line: 10, character: 38 },
        },
        message: "'schemaRegistryUrl' MUST be in the format of a URL.",
        severity: 1,
        code: 540100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka server binding 'schemaRegistryVendor' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-schema-registry-vendor-type.yaml',
      'yaml',
      0,
      specServerBindingSchemaRegistryVendorType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 30 },
          end: { line: 10, character: 33 },
        },
        message: "'schemaRegistryVendor' value must be a string",
        severity: 1,
        code: 540200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka server binding 'schemaRegistryVendor' excluded without 'schemaRegistryUrl'", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-schema-registry-vendor-excluded.yaml',
      'yaml',
      0,
      specServerBindingSchemaRegistryVendorExcluded,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 11 },
        },
        message:
          "'schemaRegistryVendor' MUST NOT be specified if 'schemaRegistryUrl' is not specified.",
        severity: 1,
        code: 540201,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka server binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-server-binding-binding-version-type.yaml',
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
        code: 540300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka channel binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
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

  it('test Kafka channel binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
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

  it('test Kafka channel binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka channel binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields040,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka channel binding allowed fields (0.5.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-0-5-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields050,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka channel binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka channel binding 'topic' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-topic-type.yaml',
      'yaml',
      0,
      specChannelBindingTopicType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 15 },
          end: { line: 8, character: 18 },
        },
        message: "'topic' value must be a string",
        severity: 1,
        code: 510100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka channel binding 'replicas' and 'partitions' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-replicas-partitions-type.yaml',
      'yaml',
      0,
      specChannelBindingReplicasPartitionsType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 14, character: 20 },
          end: { line: 14, character: 23 },
        },
        message: "'partitions' value must be positive integer",
        severity: 1,
        code: 510200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 18 },
          end: { line: 13, character: 19 },
        },
        message: "'replicas' value must be positive integer",
        severity: 1,
        code: 510300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka channel binding 'topicConfiguration' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-topic-configuration-type.yaml',
      'yaml',
      0,
      specChannelBindingTopicConfigurationType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 28 },
          end: { line: 8, character: 31 },
        },
        message: "'topicConfiguration' value must be an object",
        severity: 1,
        code: 510500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka channel binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-channel-binding-binding-version-type.yaml',
      'yaml',
      0,
      specChannelBindingBindingVersionType,
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
        code: 510400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields040,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (0.5.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-0-5-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields050,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka operation binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka operation binding 'groupId' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-group-id-type.yaml',
      'yaml',
      0,
      specOperationBindingGroupIdType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 17 },
          end: { line: 8, character: 20 },
        },
        message: 'groupId must be a schema object or a boolean JSON schema',
        severity: 1,
        code: 530100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka operation binding 'clientId' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-client-id-type.yaml',
      'yaml',
      0,
      specOperationBindingClientIdType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 18 },
          end: { line: 8, character: 21 },
        },
        message: 'clientId must be a schema object or a boolean JSON schema',
        severity: 1,
        code: 530200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka operation binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-operation-binding-binding-version-type.yaml',
      'yaml',
      0,
      specOperationBindingBindingVersionType,
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
        code: 530300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields030,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields040,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (0.5.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-0-5-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields050,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test Kafka message binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka message binding 'key' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-key-type.yaml',
      'yaml',
      0,
      specMessageBindingKeyType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 16 },
        },
        message: 'key must be a schema object, a boolean JSON schema, or an AVRO Schema',
        severity: 1,
        code: 520100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka message binding 'schemaIdLocation' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-schema-id-location-type.yaml',
      'yaml',
      0,
      specMessageBindingSchemaIdLocationType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 26 },
          end: { line: 8, character: 29 },
        },
        message: 'schemaIdLocation value must be a string',
        severity: 1,
        code: 520300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka message binding 'schemaIdPayloadEncoding' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-schema-id-payload-encoding-type.yaml',
      'yaml',
      0,
      specMessageBindingSchemaIdPayloadEncodingType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 33 },
          end: { line: 8, character: 36 },
        },
        message: 'schemaIdPayloadEncoding value must be a string',
        severity: 1,
        code: 520400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka message binding 'schemaLookupStrategy' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-schema-lookup-strategy-type.yaml',
      'yaml',
      0,
      specMessageBindingSchemaLookupStrategyType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 30 },
          end: { line: 8, character: 33 },
        },
        message: 'schemaLookupStrategy value must be a string',
        severity: 1,
        code: 520500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test Kafka message binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/kafka-message-binding-binding-version-type.yaml',
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
        code: 520200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
