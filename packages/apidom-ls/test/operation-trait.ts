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

const specOperationTraitSecurityItemsType = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'validation',
      'asyncapi',
      'operation-trait-security-items-type-3-0.yaml',
    ),
  )
  .toString();

describe('asyncapi operation trait test', function () {
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

  it('test operation trait security items type (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-trait-security-items-type.yaml',
      'yaml',
      0,
      specOperationTraitSecurityItemsType,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 1);

    const securityItemsError = result.find((r) => r.code === 2170100);
    assert.isDefined(securityItemsError, 'Should have security items type error');
    assert.strictEqual(securityItemsError?.code, 2170100);
    assert.strictEqual(
      securityItemsError?.message,
      'security must be an array of Security Scheme Objects',
    );
    assert.strictEqual(securityItemsError?.severity, DiagnosticSeverity.Error);
  });
});
