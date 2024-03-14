import fs from 'node:fs';
import path from 'node:path';
// import { assert } from 'chai';
// @ts-ignore
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';

/*
const specCompletion = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'handlebars',
      'test-template-simple-with-boolean-ancestor.mustache',
    ),
  )
  .toString();
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specCompletion = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'handlebars', 'test-template-completion-each.mustache'),
  )
  .toString();

describe('handlebars-ls-complete-schema', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
    handlebarsJsonSchemaCompletion: true,
    handlebarsJsonSchemaCompletionImplementation: 'faker',
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('handlebars markdown - test completion with schema', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      // enableLSPFilter: true,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'handlebars',
      0,
      specCompletion,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'in empty variable tag',
      3,
      8,
      {
        items: [],
        isIncomplete: false,
      },
    ];

    const pos = Position.create(
      completionTestInputValue[1] as number,
      completionTestInputValue[2] as number,
    );
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result, null, 2));
    // assert.deepEqual(result, completionTestInputValue[3] as CompletionList);
  });
});
