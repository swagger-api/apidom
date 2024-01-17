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

describe('apidom-ls-validate', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  // eslint-disable-next-line mocha/no-skipped-tests
  it('test validation of supposedly valid specs', async function () {
    this.timeout(10000);

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const languageService: LanguageService = getLanguageService(context);
    const oasPath = path.join(__dirname, 'fixtures', 'validation', 'oas', 'valid');
    const asyncPath = path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'valid');
    let dir = await fs.promises.opendir(oasPath);

    try {
      for await (const dirent of dir) {
        console.log(`expecting ${path.join(dir.path, dirent.name)} to be valid`);
        const pathToSpec = path.join(dir.path, dirent.name);
        const specString = fs.readFileSync(path.join(dir.path, dirent.name)).toString();
        const doc: TextDocument = TextDocument.create(
          `foo://bar/${pathToSpec}`,
          'yaml',
          0,
          specString,
        );
        const result = await languageService.doValidation(doc, validationContext);
        assert.deepEqual(result, [] as Diagnostic[]);
      }
      dir = await fs.promises.opendir(asyncPath);
      for await (const dirent of dir) {
        console.log(`expecting ${path.join(dir.path, dirent.name)} to be valid`);
        const specString = fs.readFileSync(path.join(dir.path, dirent.name)).toString();
        const doc: TextDocument = TextDocument.create('foo://bar/doc.json', 'yaml', 0, specString);
        const result = await languageService.doValidation(doc, validationContext);
        assert.deepEqual(result, [] as Diagnostic[]);
      }
    } finally {
      languageService.terminate();
    }
  });
});
