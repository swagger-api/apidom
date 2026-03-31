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

const bindingsPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'bindings', 'sns');

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-server-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specServerBindingAllowedFields100 = fs
  .readFileSync(path.join(bindingsPath, 'sns-server-binding-allowed-fields-1-0-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'sns-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specChannelBindingAllowedFields100 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-allowed-fields-1-0-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specChannelBindingNameRequired010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-name--required-0-1-0.yaml'))
  .toString();

const specChannelBindingNameType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-name--type-0-1-0.yaml'))
  .toString();

const specChannelBindingOrderingType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-ordering--type-0-1-0.yaml'))
  .toString();

const specChannelBindingPolicyType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-policy--type-0-1-0.yaml'))
  .toString();

const specChannelBindingTagsType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-tags--type-0-1-0.yaml'))
  .toString();

const specChannelBindingNameRequired020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-name--required-0-2-0.yaml'))
  .toString();

const specChannelBindingNameType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-name--type-0-2-0.yaml'))
  .toString();

const specChannelBindingOrderingType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-ordering--type-0-2-0.yaml'))
  .toString();

const specChannelBindingPolicyType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-policy--type-0-2-0.yaml'))
  .toString();

const specChannelBindingTagsType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-tags--type-0-2-0.yaml'))
  .toString();

const specChannelBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'sns-channel-binding-binding-version--type.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specOperationBindingAllowedFields100 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-allowed-fields-1-0-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingConsumersRequired010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-consumers--required-0-1-0.yaml'))
  .toString();

const specOperationBindingTopicType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-topic--type-0-1-0.yaml'))
  .toString();

const specOperationBindingConsumersType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-consumers--type-0-1-0.yaml'))
  .toString();

const specOperationBindingDeliveryPolicyType010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-delivery-policy--type-0-1-0.yaml'))
  .toString();

const specOperationBindingConsumersRequired020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-consumers--required-0-2-0.yaml'))
  .toString();

const specOperationBindingTopicType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-topic--type-0-2-0.yaml'))
  .toString();

const specOperationBindingConsumersType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-consumers--type-0-2-0.yaml'))
  .toString();

const specOperationBindingDeliveryPolicyType020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-delivery-policy--type-0-2-0.yaml'))
  .toString();

const specOperationBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'sns-operation-binding-binding-version--type.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'sns-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFields020 = fs
  .readFileSync(path.join(bindingsPath, 'sns-message-binding-allowed-fields-0-2-0.yaml'))
  .toString();

const specMessageBindingAllowedFields100 = fs
  .readFileSync(path.join(bindingsPath, 'sns-message-binding-allowed-fields-1-0-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'sns-message-binding-allowed-fields-latest.yaml'))
  .toString();

describe('asyncapi SNS bindings test', function () {
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

  it('test SNS server binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
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

  it('test SNS server binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
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

  it('test SNS server binding allowed fields (1.0.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-server-binding-allowed-fields-1-0-0.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields100,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
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

  it('test SNS server binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specServerBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
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

  it('test SNS channel binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS channel binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS channel binding allowed fields (1.0.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-allowed-fields-1-0-0.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields100,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS channel binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'name' required (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-name--required-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingNameRequired010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: "should always have a 'name'",
        severity: 1,
        code: 750100,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'name' field",
              action: 'addChild',
              snippetYaml: 'name: \n  ',
              snippetJson: '"name": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'name' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-name--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingNameType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 17 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 750200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'ordering' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-ordering--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingOrderingType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 21 },
        },
        message: "'ordering' value must be an object",
        severity: 1,
        code: 750300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'policy' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-policy--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingPolicyType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 16 },
          end: { line: 9, character: 19 },
        },
        message: "'policy' value must be an object",
        severity: 1,
        code: 750400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'tags' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-tags--type-0-1-0.yaml',
      'yaml',
      0,
      specChannelBindingTagsType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 14 },
          end: { line: 9, character: 17 },
        },
        message: "'tags' value must be an object",
        severity: 1,
        code: 750500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'name' required (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-name--required-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingNameRequired020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: "should always have a 'name'",
        severity: 1,
        code: 750100,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'name' field",
              action: 'addChild',
              snippetYaml: 'name: \n  ',
              snippetJson: '"name": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'name' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-name--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingNameType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 17 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 750200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'ordering' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-ordering--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingOrderingType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 21 },
        },
        message: "'ordering' value must be an object",
        severity: 1,
        code: 750300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'policy' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-policy--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingPolicyType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 16 },
          end: { line: 9, character: 19 },
        },
        message: "'policy' value must be an object",
        severity: 1,
        code: 750400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'tags' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-tags--type-0-2-0.yaml',
      'yaml',
      0,
      specChannelBindingTagsType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 14 },
          end: { line: 9, character: 17 },
        },
        message: "'tags' value must be an object",
        severity: 1,
        code: 750500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS channel binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-channel-binding-binding-version--type.yaml',
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
        code: 750600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Operation binding tests

  it('test SNS operation binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS operation binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS operation binding allowed fields (1.0.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-allowed-fields-1-0-0.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields100,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test SNS operation binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'consumers' required (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-consumers--required-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingConsumersRequired010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: "should always have a 'consumers'",
        severity: 1,
        code: 770300,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'consumers' field",
              action: 'addChild',
              snippetYaml: 'consumers:\n  - \n  ',
              snippetJson: '"consumers": [],\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'topic' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-topic--type-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingTopicType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'topic' value must be an object",
        severity: 1,
        code: 770100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'consumers' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-consumers--type-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingConsumersType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 19 },
          end: { line: 9, character: 22 },
        },
        message: "'consumers' value must be an array",
        severity: 1,
        code: 770200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'deliveryPolicy' type (0.1.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-delivery-policy--type-0-1-0.yaml',
      'yaml',
      0,
      specOperationBindingDeliveryPolicyType010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 24 },
          end: { line: 10, character: 27 },
        },
        message: "'deliveryPolicy' value must be an object",
        severity: 1,
        code: 770400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'consumers' required (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-consumers--required-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingConsumersRequired020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
        },
        message: "should always have a 'consumers'",
        severity: 1,
        code: 770300,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'consumers' field",
              action: 'addChild',
              snippetYaml: 'consumers:\n  - \n  ',
              snippetJson: '"consumers": [],\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'topic' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-topic--type-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingTopicType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 15 },
          end: { line: 9, character: 18 },
        },
        message: "'topic' value must be an object",
        severity: 1,
        code: 770100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'consumers' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-consumers--type-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingConsumersType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 19 },
          end: { line: 9, character: 22 },
        },
        message: "'consumers' value must be an array",
        severity: 1,
        code: 770200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'deliveryPolicy' type (0.2.0)", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-delivery-policy--type-0-2-0.yaml',
      'yaml',
      0,
      specOperationBindingDeliveryPolicyType020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 24 },
          end: { line: 10, character: 27 },
        },
        message: "'deliveryPolicy' value must be an object",
        severity: 1,
        code: 770400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test SNS operation binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-operation-binding-binding-version--type.yaml',
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
        code: 770500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Message binding tests

  it('test SNS message binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields010,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
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

  it('test SNS message binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields020,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 9 },
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

  it('test SNS message binding allowed fields (1.0.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-message-binding-allowed-fields-1-0-0.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields100,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
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

  it('test SNS message binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sns-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFieldsLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
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
