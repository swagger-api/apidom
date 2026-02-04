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

const specExternalDocsRefValid = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'external-docs-ref-valid.yaml'),
  )
  .toString();

const specTagRefValid = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'tag-ref-valid.yaml'),
  )
  .toString();

describe('asyncapi ref validation test', function () {
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

  it('validate externalDocs with $ref does not require url field (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/external-docs-ref-valid.yaml',
      'yaml',
      0,
      specExternalDocsRefValid,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should not have error about missing url field
    const hasUrlRequiredError = result.some(
      (diagnostic) => diagnostic.message === "must contain 'url' field",
    );
    assert.strictEqual(
      hasUrlRequiredError,
      false,
      'External docs with $ref should not require url field',
    );
  });

  it('validate tag with $ref does not require name field (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/tag-ref-valid.yaml',
      'yaml',
      0,
      specTagRefValid,
    );

    const result = await languageService.doValidation(doc, validationContext);

    // Should not have error about missing name field
    const hasNameRequiredError = result.some(
      (diagnostic) => diagnostic.message === "must contain 'name' field",
    );
    assert.strictEqual(hasNameRequiredError, false, 'Tag with $ref should not require name field');
  });
});
