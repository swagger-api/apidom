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
  'solace',
);

describe('asyncapi solace bindings test', function () {
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

  // Server binding - allowed fields
  it('test solace server binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-allowed-fields-0-1-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace server binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-allowed-fields-0-2-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace server binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-allowed-fields-0-3-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace server binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-allowed-fields-0-4-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace server binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-allowed-fields-latest.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Server binding - field types
  it("test solace server binding 'msgVpn' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-msg-vpn-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-msg-vpn-type.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 16 },
          end: { line: 10, character: 19 },
        },
        message: "'msgVpn' value must be a string",
        severity: 1,
        code: 820100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace server binding 'clientName' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-client-name-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-client-name-type.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 20 },
          end: { line: 10, character: 23 },
        },
        message: "'clientName' value must be a string",
        severity: 1,
        code: 820300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace server binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-server-binding-binding-version-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-server-binding-binding-version-type.yaml'))
        .toString(),
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
        code: 820200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Channel binding - allowed fields
  it('test solace channel binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-channel-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-channel-binding-allowed-fields-0-1-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace channel binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-channel-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-channel-binding-allowed-fields-0-2-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace channel binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-channel-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-channel-binding-allowed-fields-0-3-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace channel binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-channel-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-channel-binding-allowed-fields-0-4-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace channel binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-channel-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-channel-binding-allowed-fields-latest.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  // Message binding - allowed fields
  it('test solace message binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-message-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-message-binding-allowed-fields-0-1-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace message binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-message-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-message-binding-allowed-fields-0-2-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace message binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-message-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-message-binding-allowed-fields-0-3-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace message binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-message-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-message-binding-allowed-fields-0-4-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  it('test solace message binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-message-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-message-binding-allowed-fields-latest.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
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

  // Operation binding - allowed fields
  it('test solace operation binding allowed fields (0.1.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-allowed-fields-0-1-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-allowed-fields-0-1-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace operation binding allowed fields (0.2.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-allowed-fields-0-2-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-allowed-fields-0-2-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace operation binding allowed fields (0.3.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-allowed-fields-0-3-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-allowed-fields-0-3-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace operation binding allowed fields (0.4.0)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-allowed-fields-0-4-0.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-allowed-fields-0-4-0.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test solace operation binding allowed fields (latest)', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-allowed-fields-latest.yaml',
      'yaml',
      0,
      fs
        .readFileSync(
          path.join(bindingsPath, 'solace-operation-binding-allowed-fields-latest.yaml'),
        )
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);
  });

  // Operation binding - field types
  it("test solace operation binding 'destinations' items type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-destinations-items-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(
          path.join(bindingsPath, 'solace-operation-binding-destinations-items-type.yaml'),
        )
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 22 },
          end: { line: 8, character: 31 },
        },
        message: "'destinations' value must be a list of Destination Objects",
        severity: 1,
        code: 810100,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace operation binding 'timeToLive' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-time-to-live-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-time-to-live-type.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 20 },
          end: { line: 8, character: 29 },
        },
        message: "'timeToLive' must be an integer or a Schema Object",
        severity: 1,
        code: 810300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace operation binding 'priority' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-priority-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-priority-type.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 18 },
          end: { line: 8, character: 27 },
        },
        message: "'priority' must be an integer or a Schema Object",
        severity: 1,
        code: 810400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace operation binding 'dmqEligible' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-dmq-eligible-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-dmq-eligible-type.yaml'))
        .toString(),
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 21 },
          end: { line: 8, character: 30 },
        },
        message: "'dmqEligible' value must be a boolean",
        severity: 1,
        code: 810500,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("test solace operation binding 'bindingVersion' type", async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/solace-operation-binding-binding-version-type.yaml',
      'yaml',
      0,
      fs
        .readFileSync(path.join(bindingsPath, 'solace-operation-binding-binding-version-type.yaml'))
        .toString(),
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
        code: 810200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);
  });
});
