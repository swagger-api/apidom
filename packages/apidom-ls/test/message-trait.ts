import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specMessageTraitHeadersType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'message-trait-headers-type-3-0.yaml',
    ),
  )
  .toString();

describe('asyncapi message trait test', function () {
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

  it('test message trait headers type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-trait-headers-type.yaml',
      'yaml',
      0,
      specMessageTraitHeadersType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 1);

    const headersTypeError = result.find((r) => r.code === 2160100);
    assert.isDefined(headersTypeError, 'Should have headers type error');
    assert.strictEqual(headersTypeError?.code, 2160100);
    assert.strictEqual(
      headersTypeError?.message,
      "'headers' must be a Multi Format Schema Object or a Schema Object",
    );
    assert.strictEqual(headersTypeError?.severity, DiagnosticSeverity.Error);
  });
});
