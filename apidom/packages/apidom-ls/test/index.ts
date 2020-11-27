import fs from 'fs';
import path from 'path';
import { assert } from 'chai';

import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Position,
  SymbolInformation,
} from 'vscode-languageserver-types';
// @ts-ignore
import * as openapi3_1Adapter from 'apidom-parser-adapter-openapi-json-3-1';
// @ts-ignore
import ApiDOMParser from 'apidom-parser';
import { addMetadataMapping, metadataMap } from '../src/utils/utils';
import getLanguageService from '../src/apidomLanguageService';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidomLanguageTypes';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.json'))
  .toString();

describe('apidom-ls', function () {
  it('test parse and syntax validation', async function () {
    const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    let doc: TextDocument = TextDocument.create('foo://bar/file.json', 'json', 0, spec);

    const languageService: LanguageService = getLanguageService(context);

    let result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: { start: { line: 1, character: 13 }, end: { line: 1, character: 20 } },
        message: 'should match pattern "^3\\.0\\.\\d(-.+)?$"',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 3, character: 10 }, end: { line: 23, character: 3 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 3, character: 10 }, end: { line: 23, character: 3 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 8, character: 22 }, end: { line: 8, character: 40 } },
        message: 'should match format "uri-reference"',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 11, character: 15 }, end: { line: 16, character: 5 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 190, character: 20 }, end: { line: 195, character: 7 } },
        message: 'should be array',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 107, character: 22 }, end: { line: 112, character: 9 } },
        message: 'should be array',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 116, character: 21 }, end: { line: 143, character: 9 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 30, character: 16 }, end: { line: 32, character: 11 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 30, character: 16 }, end: { line: 32, character: 11 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 30, character: 16 }, end: { line: 32, character: 11 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 27, character: 17 }, end: { line: 34, character: 7 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 27, character: 17 }, end: { line: 34, character: 7 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
    ];

    assert.deepEqual(result, expected as Diagnostic[]);
    doc = TextDocument.create('foo://bar/file.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
      },
    ]);
  });

  it('test completion', async function () {
    const context: LanguageServiceContext = {};
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/file.json', 'json', 0, specCompletion);

    const languageService: LanguageService = getLanguageService(context);

    const pos = Position.create(3, 4);
    // const pos = Position.create(1, 17);
    // const pos = Position.create(1, 6);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    // console.log(JSON.stringify(result));
    const expected = {
      items: [
        {
          label: 'license',
          kind: 10,
          insertText: 'license: {$1}',
          insertTextFormat: 2,
          documentation: 'TODO license docs in MD to retrieve from some submodule or whatever',
          textEdit: {
            range: { start: { line: 3, character: 4 }, end: { line: 3, character: 4 } },
            newText: 'license: {$1}',
          },
        },
      ],
      isIncomplete: false,
    };
    assert.deepEqual(result, expected as CompletionList);
  });

  it('test symbols', async function () {
    const context: LanguageServiceContext = {};
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/file.json', 'json', 0, specCompletion);

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doFindDocumentSymbols(doc);

    // console.log(JSON.stringify(result));
    const expected: SymbolInformation[] = [
      {
        name: 'info',
        kind: 7,
        location: {
          uri: '',
          range: { start: { line: 2, character: 2 }, end: { line: 2, character: 8 } },
        },
      },
      {
        name: 'version',
        kind: 7,
        location: {
          uri: '',
          range: { start: { line: 5, character: 4 }, end: { line: 5, character: 13 } },
        },
      },
    ];
    assert.equal(result[0].name, expected[0].name);
    assert.equal(result[0].kind, expected[0].kind);
    assert.deepEqual(result[0].location.range, expected[0].location.range);
    assert.equal(result[1].name, expected[1].name);
    assert.equal(result[1].kind, expected[1].kind);
    assert.deepEqual(result[1].location.range, expected[1].location.range);
  });

  it('test add metadata mapping', async function () {
    const parser = ApiDOMParser();

    const value = `{
      "openapi": "3.0.0",
        "info": {
          "version": "0.1.9"
        }
      }`;
    parser.use(openapi3_1Adapter);
    // parser.use(asyncapi2_0Adapter);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parseResult = await parser.parse(value, { sourceMap: true });
    addMetadataMapping(parseResult.api);

    assert.deepEqual(parseResult.api.meta.get('metadataMap').toValue(), metadataMap);
  });
});
