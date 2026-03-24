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
      'jms',
      'jms-channel-binding-allowed-fields-0-0-1.yaml',
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
      'jms',
      'jms-channel-binding-allowed-fields-latest.yaml',
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
      'jms',
      'jms-channel-binding-destination--type.yaml',
    ),
  )
  .toString();

const specChannelBindingDestinationTypeEquals = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-channel-binding-destination-type--equals.yaml',
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
      'jms',
      'jms-channel-binding-binding-version--type.yaml',
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
      'jms',
      'jms-message-binding-allowed-fields-0-0-1.yaml',
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
      'jms',
      'jms-message-binding-allowed-fields-latest.yaml',
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
      'jms',
      'jms-message-binding-headers--type.yaml',
    ),
  )
  .toString();

const specMessageBindingBindingVersionType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-message-binding-binding-version--type.yaml',
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
      'jms',
      'jms-operation-binding-allowed-fields-0-0-1.yaml',
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
      'jms',
      'jms-operation-binding-allowed-fields-latest.yaml',
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
      'jms',
      'jms-server-binding-allowed-fields-0-0-1.yaml',
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
      'jms',
      'jms-server-binding-allowed-fields-latest.yaml',
    ),
  )
  .toString();

const specServerBindingJmsConnectionFactoryRequired001 = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-jms-connection-factory--required-0-0-1.yaml',
    ),
  )
  .toString();

const specServerBindingJmsConnectionFactoryRequiredLatest = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-jms-connection-factory--required-latest.yaml',
    ),
  )
  .toString();

const specServerBindingJmsConnectionFactoryType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-jms-connection-factory--type.yaml',
    ),
  )
  .toString();

const specServerBindingPropertiesType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-properties--type.yaml',
    ),
  )
  .toString();

const specServerBindingClientIdType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-client-id--type.yaml',
    ),
  )
  .toString();

const specServerBindingBindingVersionType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'bindings',
      'jms',
      'jms-server-binding-binding-version--type.yaml',
    ),
  )
  .toString();

describe('asyncapi jms bindings test', function () {
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

  it('jms channel binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-channel-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specChannelBindingAllowedFields001,
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

  it('jms channel binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-channel-binding-allowed-fields-latest.yaml',
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

  it('jms channel binding - destination field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-channel-binding-destination--type.yaml',
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
        code: 470200,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms channel binding - destinationType field equals queue/fifo-queue (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-channel-binding-destination-type--equals.yaml',
      'yaml',
      0,
      specChannelBindingDestinationTypeEquals,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 25 },
          end: { line: 8, character: 32 },
        },
        message: 'destinationType must be one of allowed values',
        severity: 1,
        code: 470300,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms channel binding - bindingVersion field type', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-channel-binding-binding-version--type.yaml',
      'yaml',
      0,
      specChannelBindingBindingVersionType,
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
        code: 470100,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms message binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-message-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specMessageBindingAllowedFields001,
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

  it('jms message binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-message-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms message binding - headers field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-message-binding-headers--type.yaml',
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
        code: 480100,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms message binding - bindingVersion field type', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-message-binding-binding-version--type.yaml',
      'yaml',
      0,
      specMessageBindingBindingVersionType,
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
        code: 480200,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms operation binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-operation-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specOperationBindingAllowedFields001,
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

  it('jms operation binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-operation-binding-allowed-fields-latest.yaml',
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
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - not allowed fields (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-allowed-fields-0-0-1.yaml',
      'yaml',
      0,
      specServerBindingAllowedFields001,
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

  it('jms server binding - not allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-allowed-fields-latest.yaml',
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
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - jmsConnectionFactory field required (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-jms-connection-factory--required-0-0-1.yaml',
      'yaml',
      0,
      specServerBindingJmsConnectionFactoryRequired001,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: "should always have a 'jmsConnectionFactory'",
        severity: 1,
        code: 500050,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'jmsConnectionFactory' field",
              action: 'addChild',
              snippetYaml: 'jmsConnectionFactory: \n  ',
              snippetJson: '"jmsConnectionFactory": "",\n    ',
            },
          ],
        },
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - jmsConnectionFactory field required (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-jms-connection-factory--required-latest.yaml',
      'yaml',
      0,
      specServerBindingJmsConnectionFactoryRequiredLatest,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 9 },
        },
        message: "should always have a 'jmsConnectionFactory'",
        severity: 1,
        code: 500050,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'jmsConnectionFactory' field",
              action: 'addChild',
              snippetYaml: 'jmsConnectionFactory: \n  ',
              snippetJson: '"jmsConnectionFactory": "",\n    ',
            },
          ],
        },
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - jmsConnectionFactory field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-jms-connection-factory--type.yaml',
      'yaml',
      0,
      specServerBindingJmsConnectionFactoryType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 30 },
          end: { line: 8, character: 33 },
        },
        message: "'jmsConnectionFactory' value must be a string",
        severity: 1,
        code: 500100,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - properties field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-properties--type.yaml',
      'yaml',
      0,
      specServerBindingPropertiesType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 20 },
          end: { line: 9, character: 27 },
        },
        message: "'properties' must be an array of objects",
        severity: 1,
        code: 500200,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - clientID field type (v0.0.1)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-client-id--type.yaml',
      'yaml',
      0,
      specServerBindingClientIdType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 21 },
        },
        message: "'clientID' value must be a string",
        severity: 1,
        code: 500300,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });

  it('jms server binding - bindingVersion field type', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/jms-server-binding-binding-version--type.yaml',
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
        code: 500400,
        source: 'apilint',
        data: {},
      },
    ];

    assert.deepEqual(result, expected);
  });
});
