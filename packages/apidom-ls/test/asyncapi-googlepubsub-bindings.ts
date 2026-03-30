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
  'googlepubsub',
);

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingLabelsType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-labels-type.yaml'))
  .toString();

const specChannelBindingMessageRetentionDurationType = fs
  .readFileSync(
    path.join(bindingsPath, 'googlepubsub-channel-binding-message-retention-duration-type.yaml'),
  )
  .toString();

const specChannelBindingMessageStoragePolicyType = fs
  .readFileSync(
    path.join(bindingsPath, 'googlepubsub-channel-binding-message-storage-policy-type.yaml'),
  )
  .toString();

const specChannelBindingSchemaSettingsType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-schema-settings-type.yaml'))
  .toString();

const specChannelBindingTopicType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-topic-type.yaml'))
  .toString();

const specChannelBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-channel-binding-binding-version-type.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specMessageBindingAttributesType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-attributes-type.yaml'))
  .toString();

const specMessageBindingOrderingKeyType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-ordering-key-type.yaml'))
  .toString();

const specMessageBindingSchemaType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-schema-type.yaml'))
  .toString();

const specMessageBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-message-binding-binding-version-type.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(
    path.join(bindingsPath, 'googlepubsub-operation-binding-allowed-fields-latest.yaml'),
  )
  .toString();

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'googlepubsub-server-binding-allowed-fields-latest.yaml'))
  .toString();

describe('asyncapi Google Cloud Pub/Sub bindings test', function () {
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

  it('googlepubsub channel binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub channel binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'labels' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-labels-type.yaml',
      'yaml',
      0,
      specChannelBindingLabelsType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 19 },
        },
        message: "'labels' value must be an object",
        severity: 1,
        code: 950100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'messageRetentionDuration' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-message-retention-duration-type.yaml',
      'yaml',
      0,
      specChannelBindingMessageRetentionDurationType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 34 },
          end: { line: 8, character: 37 },
        },
        message: "'messageRetentionDuration' value must be a string",
        severity: 1,
        code: 950200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'messageStoragePolicy' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-message-storage-policy-type.yaml',
      'yaml',
      0,
      specChannelBindingMessageStoragePolicyType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 30 },
          end: { line: 8, character: 33 },
        },
        message: "'messageStoragePolicy' value must be an object",
        severity: 1,
        code: 950300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'schemaSettings' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-schema-settings-type.yaml',
      'yaml',
      0,
      specChannelBindingSchemaSettingsType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 24 },
          end: { line: 8, character: 27 },
        },
        message: "'schemaSettings' value must be an object",
        severity: 1,
        code: 950400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'topic' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-topic-type.yaml',
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
        code: 950500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub channel binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-channel-binding-binding-version-type.yaml',
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
        code: 950600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub message binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub message binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub message binding - 'attributes' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-attributes-type.yaml',
      'yaml',
      0,
      specMessageBindingAttributesType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 20 },
          end: { line: 8, character: 23 },
        },
        message: "'attributes' value must be an object",
        severity: 1,
        code: 960100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub message binding - 'orderingKey' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-ordering-key-type.yaml',
      'yaml',
      0,
      specMessageBindingOrderingKeyType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 21 },
          end: { line: 8, character: 24 },
        },
        message: "'orderingKey' value must be a string",
        severity: 1,
        code: 960200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub message binding - 'schema' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-schema-type.yaml',
      'yaml',
      0,
      specMessageBindingSchemaType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 19 },
        },
        message: "'schema' value must be an object",
        severity: 1,
        code: 960300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("googlepubsub message binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-message-binding-binding-version-type.yaml',
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
        code: 960400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('googlepubsub operation binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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

  it('googlepubsub operation binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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

  it('googlepubsub operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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

  it('googlepubsub server binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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

  it('googlepubsub server binding - not allowed fields (v0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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

  it('googlepubsub server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/googlepubsub-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 18 },
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
