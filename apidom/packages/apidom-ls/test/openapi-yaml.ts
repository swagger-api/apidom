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
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
const specCompletionNoEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-no-empty.yaml'))
  .toString();

const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();

describe('apidom-ls-yaml', function () {
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('test parse and syntax validation', async function () {
    const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    let doc: TextDocument = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, spec);
    const languageService: LanguageService = getLanguageService(context);

    let result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: { start: { line: 1, character: 9 }, end: { line: 1, character: 14 } },
        message: 'should match pattern "^3\\.0\\.\\d(-.+)?$"',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 3, character: 0 }, end: { line: 3, character: 4 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 3, character: 0 }, end: { line: 3, character: 4 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 9, character: 18 }, end: { line: 9, character: 34 } },
        message: 'should match format "uri-reference"',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 12, character: 2 }, end: { line: 12, character: 9 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 64, character: 0 }, end: { line: 64, character: 5 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 28, character: 8 }, end: { line: 28, character: 10 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 28, character: 8 }, end: { line: 28, character: 10 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 28, character: 8 }, end: { line: 28, character: 10 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 25, character: 4 }, end: { line: 25, character: 11 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 25, character: 4 }, end: { line: 25, character: 11 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 37, character: 8 }, end: { line: 37, character: 15 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 37, character: 8 }, end: { line: 37, character: 15 } },
        message: 'should NOT have additional properties',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 37, character: 8 }, end: { line: 37, character: 15 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 37, character: 8 }, end: { line: 37, character: 15 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 30, character: 4 }, end: { line: 30, character: 8 } },
        message: "should have required property '$ref'",
        severity: 1,
        code: 0,
      },
      {
        range: { start: { line: 30, character: 4 }, end: { line: 30, character: 8 } },
        message: 'should match exactly one schema in oneOf',
        severity: 1,
        code: 0,
      },
    ];

    assert.deepEqual(result, expected as Diagnostic[]);

    doc = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    // console.log(JSON.stringify(result));
    // TODO yaml errors not recovered? no result?
    /*     assert.deepEqual(result, [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
      },
    ]); */
  });

  it('test completion', async function () {
    const context: LanguageServiceContext = {};
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    const doc = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletionNoEmpty);

    const languageService: LanguageService = getLanguageService(context);

    const pos = Position.create(2, 4);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const expected = {
      items: [
        {
          label: 'license',
          kind: 10,
          insertText: 'license: {$1}',
          insertTextFormat: 2,
          documentation: 'TODO license docs in MD to retrieve from some submodule or whatever',
          textEdit: {
            range: { start: { line: 2, character: 2 }, end: { line: 2, character: 7 } },
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
    const doc = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletion);

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doFindDocumentSymbols(doc);

    // console.log(JSON.stringify(result));
    const expected: SymbolInformation[] = [
      {
        name: 'info',
        kind: 7,
        location: {
          uri: '',
          range: { start: { line: 1, character: 0 }, end: { line: 1, character: 4 } },
        },
      },
      {
        name: 'version',
        kind: 7,
        location: {
          uri: '',
          range: { start: { line: 4, character: 2 }, end: { line: 4, character: 9 } },
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
});
