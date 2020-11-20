import fs from 'fs';
import path from 'path';
import { assert } from 'chai';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import getLanguageService from '../src/apidomLanguageService';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidomLanguageTypes';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.json'))
  .toString();

describe('apidom-ls', function () {
  it('test parse and syntax validation', async function () {
    // doit();
    const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
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
});
