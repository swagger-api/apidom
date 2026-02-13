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

const specServerFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-fields.yaml'))
  .toString();

const specServerAllowedFields = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-allowed-fields-3-0.yaml'),
  )
  .toString();

describe('asyncapi server test', function () {
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

  it('complete server host field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const hostItem = result?.items.find((item) => item.label === 'host');
    assert.deepEqual(hostItem, {
      label: 'host',
      insertText: 'host: $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          '**REQUIRED**. The server host name. It MAY include the port. This field supports [Server Variables](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject). Variable substitutions will be made when a variable is named in `{`braces`}`.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete server pathname field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const pathnameItem = result?.items.find((item) => item.label === 'pathname');
    assert.deepEqual(pathnameItem, {
      label: 'pathname',
      insertText: 'pathname: $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'The path to a resource in the host. This field supports [Server Variables](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverVariableObject). Variable substitutions will be made when a variable is named in `{`braces`}`.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete server title and summary fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields.yaml',
      'yaml',
      0,
      specServerFields,
    );

    const pos = Position.create(3, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const titleItem = result?.items.find((item) => item.label === 'title');
    assert.deepEqual(titleItem, {
      label: 'title',
      insertText: 'title: $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value: 'A human-friendly title for the server.',
      },
      targetSpecs: AsyncAPI3,
    } as any);

    const summaryItem = result?.items.find((item) => item.label === 'summary');
    assert.deepEqual(summaryItem, {
      label: 'summary',
      insertText: 'summary: $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value: 'A short summary of the server.',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('test server allowed fields (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-allowed-fields.yaml',
      'yaml',
      0,
      specServerAllowedFields,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.isAtLeast(result.length, 3);

    const notAllowedErrors = result.filter(
      (diagnostic) => diagnostic.message === 'Object includes not allowed fields',
    );
    assert.isAtLeast(notAllowedErrors.length, 1);
    assert.strictEqual(notAllowedErrors[0].severity, DiagnosticSeverity.Error);
  });
});
