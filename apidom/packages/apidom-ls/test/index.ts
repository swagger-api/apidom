import fs from 'fs';
import path from 'path';
import { assert } from 'chai';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity } from 'vscode-languageserver-types';
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

    languageService.doValidation(doc, validationContext).then((result) => {
      assert.deepEqual(result, []);
    });
    // spec with syntax error
    doc = TextDocument.create('foo://bar/file.json', 'json', 0, specError);

    languageService.doValidation(doc, validationContext).then((result) => {
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
});
