import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';
import {
  pathExists,
  // logTagDetails,
} from '../src/services/completion/utils';
import { context as codegenContext } from '../src/services/completion/context-short';
const specMustache = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'poc', 'test-template-shorter.mustache'))
  .toString();

describe('apidom-ls-validate-poc', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  it.only('test validation for mustache', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
    console.log(
      pathExists(codegenContext, ['apiInfo', 'apis', 'operations', 'operation', 'classname']),
    );

    // if (true) return;

    // valid spec
    const doc: TextDocument = TextDocument.create('foo://bar/doc.json', 'specDoc', 0, specMustache);

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doValidation(doc, validationContext);
    // tslint:disable-next-line
    // const expected: Diagnostic[] = [];
    console.log(JSON.stringify(result, null, 2));
    // assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });
});
