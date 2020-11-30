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
import { getParser } from 'apidom-ls/src/parserFactory';
import getLanguageService from '../src/apidomLanguageService';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidomLanguageTypes';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const specGood = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-good.yaml'))
  .toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
const specCompletionNoEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-no-empty.yaml'))
  .toString();
const specCompletionJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();

describe('apidom-complete-test', function () {
  it('test complete yaml', async function () {
    /*     const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
 */

    const context: LanguageServiceContext = {};
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletionNoEmpty);
    // const doc = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specCompletionJson);

    const languageService: LanguageService = getLanguageService(context);

    const pos = Position.create(2, 4);
    // const pos = Position.create(4, 7);
    // const pos = Position.create(1, 17);
    // const pos = Position.create(1, 6);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    console.log(JSON.stringify(result));
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
});
