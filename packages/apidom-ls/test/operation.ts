import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

// @ts-ignore

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';
import operationLintExpected from './fixtures/async/operation/operation-lint-expected.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specOperationLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'operation', 'operation-lint.yaml'))
  .toString();

describe('asyncapi operation test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('lint operation', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specChannelLint.yaml',
      'yaml',
      0,
      specOperationLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, operationLintExpected as Diagnostic[]);
  });
});
