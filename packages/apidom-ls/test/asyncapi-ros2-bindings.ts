import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { AsyncAPI310 } from '../src/config/asyncapi/target-specs.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bindingsPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'bindings', 'ros2');

const specBindingsValid = fs
  .readFileSync(path.join(bindingsPath, 'ros2-bindings-valid.yaml'))
  .toString();

const specBindingsAsyncapi300 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-bindings-asyncapi-3-0-0.yaml'))
  .toString();

const specBindingsType = fs
  .readFileSync(path.join(bindingsPath, 'ros2-bindings-type.yaml'))
  .toString();

const specServerBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specServerBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-binding-allowed-fields-latest.yaml'))
  .toString();

const specServerBindingFieldTypes = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-binding-field-types.yaml'))
  .toString();

const specServerBindingDomainIdMaximum = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-binding-domain-id-maximum.yaml'))
  .toString();

const specServerBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-binding-binding-version-type.yaml'))
  .toString();

const specChannelBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-channel-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specChannelBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'ros2-channel-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-operation-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specOperationBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'ros2-operation-binding-allowed-fields-latest.yaml'))
  .toString();

const specOperationBindingFieldTypes = fs
  .readFileSync(path.join(bindingsPath, 'ros2-operation-binding-field-types.yaml'))
  .toString();

const specOperationBindingRoleType = fs
  .readFileSync(path.join(bindingsPath, 'ros2-operation-binding-role-type.yaml'))
  .toString();

const specOperationBindingBindingVersionType = fs
  .readFileSync(path.join(bindingsPath, 'ros2-operation-binding-binding-version-type.yaml'))
  .toString();

const specMessageBindingAllowedFields010 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-message-binding-allowed-fields-0-1-0.yaml'))
  .toString();

const specMessageBindingAllowedFieldsLatest = fs
  .readFileSync(path.join(bindingsPath, 'ros2-message-binding-allowed-fields-latest.yaml'))
  .toString();

const specServerBindingsCompletion = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-bindings-completion.yaml'))
  .toString();

const specServerBindingsCompletion300 = fs
  .readFileSync(path.join(bindingsPath, 'ros2-server-bindings-completion-3-0-0.yaml'))
  .toString();

describe('asyncapi ROS 2 bindings test', function () {
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

  it('ros2 bindings - valid AsyncAPI 3.1.0 document', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-bindings-valid.yaml',
      'yaml',
      0,
      specBindingsValid,
    );

    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, []);
  });

  it('ros2 bindings - not allowed in AsyncAPI 3.0.0', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-bindings-asyncapi-3-0-0.yaml',
      'yaml',
      0,
      specBindingsAsyncapi300,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 4 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: {
          start: { line: 17, character: 4 },
          end: { line: 17, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: {
          start: { line: 23, character: 8 },
          end: { line: 23, character: 16 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: {
          start: { line: 30, character: 4 },
          end: { line: 30, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 bindings - 'ros2' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-bindings-type.yaml',
      'yaml',
      0,
      specBindingsType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 13 },
        },
        message: '"ros2" must be a ROS 2 Server Binding',
        severity: 1,
        code: 2190100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 12 },
          end: { line: 10, character: 13 },
        },
        message: '"ros2" must be a ROS 2 Channel Binding',
        severity: 1,
        code: 2200100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 12 },
          end: { line: 13, character: 13 },
        },
        message: '"ros2" must be a ROS 2 Operation Binding',
        severity: 1,
        code: 2210100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 12 },
          end: { line: 16, character: 13 },
        },
        message: '"ros2" must be a ROS 2 Message Binding',
        severity: 1,
        code: 2220100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 server binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-binding-allowed-fields-0-1-0.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 server binding - 'rmwImplementation' and 'domainId' field types", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-binding-field-types.yaml',
      'yaml',
      0,
      specServerBindingFieldTypes,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 27 },
          end: { line: 8, character: 30 },
        },
        message: "'rmwImplementation' value must be a string",
        severity: 1,
        code: 2230100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 21 },
        },
        message: "'domainId' must be a non-negative integer",
        severity: 1,
        code: 2230200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 server binding - 'domainId' maximum", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-binding-domain-id-maximum.yaml',
      'yaml',
      0,
      specServerBindingDomainIdMaximum,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 18 },
          end: { line: 8, character: 21 },
        },
        message: "'domainId' value must be less than 232",
        severity: 1,
        code: 2230201,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 server binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-binding-binding-version-type.yaml',
      'yaml',
      0,
      specServerBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 24 },
          end: { line: 8, character: 25 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 2230300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 channel binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-channel-binding-allowed-fields-0-1-0.yaml',
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

  it('ros2 channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-channel-binding-allowed-fields-latest.yaml',
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

  it('ros2 operation binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-operation-binding-allowed-fields-0-1-0.yaml',
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

  it('ros2 operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-operation-binding-allowed-fields-latest.yaml',
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

  it("ros2 operation binding - 'role', 'node' and 'qosPolicies' field values", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-operation-binding-field-types.yaml',
      'yaml',
      0,
      specOperationBindingFieldTypes,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 20 },
        },
        message: "'role' must be one of allowed values",
        severity: 1,
        code: 2250101,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 14 },
          end: { line: 9, character: 17 },
        },
        message: "'node' value must be a string",
        severity: 1,
        code: 2250200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 21 },
          end: { line: 10, character: 29 },
        },
        message: "'qosPolicies' value must be a Quality of Service Policy Object",
        severity: 1,
        code: 2250300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 operation binding - 'role' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-operation-binding-role-type.yaml',
      'yaml',
      0,
      specOperationBindingRoleType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 15 },
        },
        message: "'role' value must be a string",
        severity: 1,
        code: 2250100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 14 },
          end: { line: 8, character: 15 },
        },
        message: "'role' must be one of allowed values",
        severity: 1,
        code: 2250101,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("ros2 operation binding - 'bindingVersion' field type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-operation-binding-binding-version-type.yaml',
      'yaml',
      0,
      specOperationBindingBindingVersionType,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 24 },
          end: { line: 8, character: 25 },
        },
        message: "'bindingVersion' value must be a string",
        severity: 1,
        code: 2250400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 message binding - not allowed fields (v0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-message-binding-allowed-fields-0-1-0.yaml',
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
        message: 'This object DOES NOT contain any ROS 2 specific properties.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-message-binding-allowed-fields-latest.yaml',
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
        message: 'This object DOES NOT contain any ROS 2 specific properties.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('ros2 server bindings - completion (AsyncAPI 3.1.0)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-bindings-completion.yaml',
      'yaml',
      0,
      specServerBindingsCompletion,
    );

    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: Position.create(7, 6) },
      completionContext,
    );
    const ros2Item = result?.items.find((item) => item.label === 'ros2');

    assert.deepEqual(ros2Item, {
      label: 'ros2',
      insertText: 'ros2: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          '[ROS 2 Server Binding](https://github.com/asyncapi/bindings/blob/master/ros2/README.md#server-binding-object)\n\\\n\\\nProtocol-specific information for a ROS 2 server.',
      },
      targetSpecs: AsyncAPI310,
    } as any);
  });

  it('ros2 server bindings - no completion (AsyncAPI 3.0.0)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ros2-server-bindings-completion-3-0-0.yaml',
      'yaml',
      0,
      specServerBindingsCompletion300,
    );

    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: Position.create(7, 6) },
      completionContext,
    );

    assert.isUndefined(result?.items.find((item) => item.label === 'ros2'));
    assert.isDefined(result?.items.find((item) => item.label === 'pulsar'));
  });
});
