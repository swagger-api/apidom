import fs from 'node:fs';
import path from 'node:path';
// import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';
// import { getContext } from '../src/utils/handlebars/context-short';

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

const specCompletion = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'handlebars', 'test-template-each-key-simple.mustache'),
  )
  .toString();

const specCompletionEach = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'handlebars', 'test-template-each-complete.mustache'),
  )
  .toString();

const specCompletionFinalBoolean = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'handlebars', 'test-template-final-boolean-complete.mustache'),
  )
  .toString();

describe('handlebars-ls-complete', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('handlebars markdown - test completion', async function () {
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
      10, // 2,
      15, // 14,
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

  it.only('handlebars markdown - test completion each', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      // enableLSPFilter: true,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'handlebars',
      0,
      specCompletionEach,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'in each section tag',
      1,
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
    // console.log(JSON.stringify(getContext(false), null, 2));
  });

  it('handlebars markdown - test completion each with partial', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      // enableLSPFilter: true,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'handlebars',
      0,
      specCompletionEach,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'in each section tag',
      4,
      11,
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

  it('handlebars markdown - test completion each with dot', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      // enableLSPFilter: true,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'handlebars',
      0,
      specCompletionEach,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'in each section tag',
      11,
      4,
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
    // console.log(JSON.stringify(getContext(false), null, 2));
  });

  it('handlebars markdown - test completion final boolean', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      // enableLSPFilter: true,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'handlebars',
      0,
      specCompletionFinalBoolean,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'in each section tag',
      9,
      10,
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
    // console.log(JSON.stringify(getContext(false), null, 2));
  });
});
