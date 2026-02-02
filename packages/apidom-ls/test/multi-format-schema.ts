import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, Position } from 'vscode-languageserver-types';

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

const specSchemaFormat = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'schema-format.yaml'))
  .toString();

const specMultiFormatSchemaLint = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'multi-format-schema-lint-3-0.yaml'),
  )
  .toString();

describe('asyncapi multi-format schema test', function () {
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

  it('complete schema format values (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-format.yaml',
      'yaml',
      0,
      specSchemaFormat,
    );

    const pos = Position.create(4, 20);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const asyncapiItem = result?.items.find(
      (item) => item.label === 'application/vnd.aai.asyncapi;version=3.0.0',
    );
    assert.deepEqual(asyncapiItem, {
      target: 'schemaFormat',
      label: 'application/vnd.aai.asyncapi;version=3.0.0',
      insertText: 'application/vnd.aai.asyncapi;version=3.0.0$1',
      kind: 12,
      insertTextFormat: 2,
      filterText: '',
      sortText: '0001',
      targetSpecs: AsyncAPI3,
    } as any);

    const jsonSchemaItem = result?.items.find(
      (item) => item.label === 'application/schema+json;version=draft-07',
    );
    assert.deepEqual(jsonSchemaItem, {
      target: 'schemaFormat',
      label: 'application/schema+json;version=draft-07',
      insertText: 'application/schema+json;version=draft-07$1',
      kind: 12,
      insertTextFormat: 2,
      filterText: '',
      sortText: '0004',
      targetSpecs: AsyncAPI3,
    } as any);

    const avroItem = result?.items.find(
      (item) => item.label === 'application/vnd.apache.avro;version=1.9.0',
    );
    assert.deepEqual(avroItem, {
      target: 'schemaFormat',
      label: 'application/vnd.apache.avro;version=1.9.0',
      insertText: 'application/vnd.apache.avro;version=1.9.0$1',
      kind: 12,
      insertTextFormat: 2,
      filterText: '',
      sortText: '0006',
      targetSpecs: AsyncAPI3,
    } as any);

    const protobufItem = result?.items.find(
      (item) => item.label === 'application/vnd.google.protobuf;version=3',
    );
    assert.deepEqual(protobufItem, {
      target: 'schemaFormat',
      label: 'application/vnd.google.protobuf;version=3',
      insertText: 'application/vnd.google.protobuf;version=3$1',
      kind: 12,
      insertTextFormat: 2,
      filterText: '',
      sortText: '0014',
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('lint multi-format schema (AsyncAPI 3)', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/multi-format-schema-lint.yaml',
      'yaml',
      0,
      specMultiFormatSchemaLint,
    );

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        range: {
          start: { line: 11, character: 24 },
          end: { line: 11, character: 27 },
        },
        message: "'schemaFormat' value must be a string",
        severity: 1,
        code: 2050100,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);
  });
});
