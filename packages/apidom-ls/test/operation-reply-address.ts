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

const specOperationReplyAddressLint = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'operation-reply-address-lint-3-0.yaml',
    ),
  )
  .toString();

describe('asyncapi operation reply address test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  it('lint operation reply address (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-reply-address-lint.yaml',
      'yaml',
      0,
      specOperationReplyAddressLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        range: {
          start: { line: 13, character: 6 },
          end: { line: 13, character: 13 },
        },
        message: "must contain 'location' field",
        severity: 1,
        code: 2040101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'location' field",
              action: 'addChild',
              snippetYaml: 'location: \n  ',
              snippetJson: '"location": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 25, character: 18 },
          end: { line: 25, character: 21 },
        },
        message: "'location' value must be a string",
        severity: 1,
        code: 2040100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 27, character: 21 },
          end: { line: 27, character: 24 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 2040200,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);

    languageService.terminate();
  });
});
