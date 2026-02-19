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

const specParameterDefaultType = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'parameter-default-type-3-0.yaml'),
  )
  .toString();

describe('asyncapi parameter default test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  it('lint parameter default type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-default-type.yaml',
      'yaml',
      0,
      specParameterDefaultType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Sort results by line number for consistency
    result.sort((a, b) => a.range.start.line - b.range.start.line);

    // Note: apilintArrayOfType only reports first invalid item per array
    assert.deepEqual(result, [
      {
        range: {
          start: { line: 19, character: 6 },
          end: { line: 19, character: 12 },
        },
        message: "'enum' must be an array of strings",
        severity: 1,
        code: 2120100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 6 },
          end: { line: 19, character: 12 },
        },
        message: "'examples' must be an array of strings",
        severity: 1,
        code: 2120300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 17 },
          end: { line: 25, character: 20 },
        },
        message: "'default' must be a string",
        severity: 1,
        code: 2120200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 36, character: 21 },
          end: { line: 36, character: 24 },
        },
        message: "'description' must be a string",
        severity: 1,
        code: 160100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 38, character: 18 },
          end: { line: 38, character: 22 },
        },
        message: "'location' must be a string",
        severity: 1,
        code: 160300,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);

    languageService.terminate();
  });
});
