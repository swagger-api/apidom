import fs from 'node:fs';
import path from 'node:path';
// import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';

const specMustache = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'handlebars', 'test-template-each-key-validate.mustache'),
  )
  .toString();

/* const specMustache = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'handlebars',
      'test-template-simple-with-boolean-ancestor-basic-nofirst.mustache',
    ),
  )
  .toString(); */

describe('apidom-ls-validate-handlebars', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test validation for mustache', async function () {
    this.timeout(10000);
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/doc.json', 'specDoc', 0, specMustache);

    // const theStack: MustacheTag[] = [];
    // const theRootTags: MustacheTag[] = [];
    // const tags = parseMustacheTags(doc.getText(), theStack, theRootTags);
    // logTagDetails(tags, doc);

    // let allTags: MustacheTag[] = [];
    // getAllMustacheTags(tags, allTags);
    // allTags = sortTags(allTags);
    // markOverlappingTags(allTags);

    // console.log(JSON.stringify(codegenContext, null, 2));
    /*    console.log(
      pathExists(codegenContext, [
        'apiInfo',
        'apis',
        'operations',
        'operation',
        'contents',
        'hasAuthMethods',
        'authMethods',
        'isBasic',
      ]),
    ); */

    // if (true) return;

    const languageService: LanguageService = getLanguageService(context);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await languageService.doValidation(doc, validationContext);
    // tslint:disable-next-line
    // const expected: Diagnostic[] = [];
    console.log(JSON.stringify(result, null, 2));
    // assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });
});
