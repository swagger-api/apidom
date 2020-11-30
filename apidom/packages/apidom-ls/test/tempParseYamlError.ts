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
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();

describe('apidom-parse-test', function () {
  it('test parse yaml error', async function () {
    /*     const context: LanguageServiceContext = {};
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
 */
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/file.yaml', 'yaml', 0, specError);
    // const languageService: LanguageService = getLanguageService(context);

    // const result = await languageService.doValidation(doc, validationContext);

    const parser = getParser(doc);
    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    return parser.parse(text, { sourceMap: true }).then((result) => {
      const { api } = result;
      // console.log('AAAA', JSON.stringify(result));
      console.log('AAAA', JSON.stringify(result, null, 2).substring(0, 2000));
      if (!api) {
        return diagnostics;
      }
      api.freeze(); // !! freeze and add parent !!

      if (result.annotations) {
        for (const annotation of result.annotations) {
          // console.log(annotation);
        }
      }
    });
  });
});
