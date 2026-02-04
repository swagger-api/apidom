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

const specOperationReplyLint = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'operation-reply-lint-3-0.yaml'),
  )
  .toString();

describe('asyncapi operation reply test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  it('lint operation reply (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-reply-lint.yaml',
      'yaml',
      0,
      specOperationReplyLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        range: {
          start: { line: 14, character: 15 },
          end: { line: 14, character: 29 },
        },
        message: "'address' must be an object",
        severity: 1,
        code: 2030100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 15 },
          end: { line: 16, character: 18 },
        },
        message: "'channel' must be an object",
        severity: 1,
        code: 2030200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 16 },
          end: { line: 18, character: 30 },
        },
        message: "'messages' must be an array",
        severity: 1,
        code: 2030300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 28, character: 8 },
          end: { line: 28, character: 42 },
        },
        message: "'address' must be an object",
        severity: 1,
        code: 2030100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 4 },
          end: { line: 23, character: 9 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 2030401,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ] as Diagnostic[]);

    languageService.terminate();
  });
});
