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

const specInfoFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'info-fields.yaml'))
  .toString();

const specInfoAllowedFields = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'info-allowed-fields-3-0.yaml'),
  )
  .toString();

describe('asyncapi info test', function () {
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

  it('complete info tags field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/info-fields.yaml',
      'yaml',
      0,
      specInfoFields,
    );

    const pos = Position.create(4, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const tagsItem = result?.items.find((item) => item.label === 'tags');
    assert.deepEqual(tagsItem, {
      label: 'tags',
      insertText: 'tags: \n  - $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          '[[Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject)]\n\\\n\\\nA list of tags for application API documentation control. Tags can be used for logical grouping of applications.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete info externalDocs field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/info-fields.yaml',
      'yaml',
      0,
      specInfoFields,
    );

    const pos = Position.create(4, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const externalDocsItem = result?.items.find((item) => item.label === 'externalDocs');
    assert.deepEqual(externalDocsItem, {
      label: 'externalDocs',
      insertText: 'externalDocs: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation of the exposed API.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('test info allowed fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/info-allowed-fields.yaml',
      'yaml',
      0,
      specInfoAllowedFields,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.strictEqual(result.length, 1);

    assert.strictEqual(result[0].code, 15000);
    assert.strictEqual(result[0].message, 'Object includes not allowed fields');
    assert.strictEqual(result[0].severity, DiagnosticSeverity.Error);
  });
});
