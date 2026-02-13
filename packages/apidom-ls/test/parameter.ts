import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity, Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { AsyncAPI3 } from '../src/config/asyncapi/target-specs.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specParameterFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'parameter-fields.yaml'))
  .toString();

const specParameterAllowedFields = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'parameter-allowed-fields-3-0.yaml'),
  )
  .toString();

describe('asyncapi parameter test', function () {
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

  it('complete parameter enum field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-fields.yaml',
      'yaml',
      0,
      specParameterFields,
    );

    const pos = Position.create(5, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const enumItem = result?.items.find((item) => item.label === 'enum');
    assert.deepEqual(enumItem, {
      label: 'enum',
      insertText: 'enum: \n  - $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'An enumeration of string values to be used if the substitution options are from a limited set.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete parameter default and examples fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-fields.yaml',
      'yaml',
      0,
      specParameterFields,
    );

    const pos = Position.create(5, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const defaultItem = result?.items.find((item) => item.label === 'default');
    assert.deepEqual(defaultItem, {
      label: 'default',
      insertText: 'default: $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'The default value to use for substitution, which SHALL be sent if an alternate value is not supplied.',
      },
      targetSpecs: AsyncAPI3,
    } as any);

    const examplesItem = result?.items.find((item) => item.label === 'examples');
    assert.deepEqual(examplesItem, {
      label: 'examples',
      insertText: 'examples: \n  - $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value: 'An array of examples of the parameter value.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('test parameter allowed fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-allowed-fields.yaml',
      'yaml',
      0,
      specParameterAllowedFields,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.strictEqual(result.length, 1);

    assert.strictEqual(result[0].code, 15000);
    assert.strictEqual(result[0].message, 'Object includes not allowed fields');
    assert.strictEqual(result[0].severity, DiagnosticSeverity.Error);
  });
});
