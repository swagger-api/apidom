import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';

// @ts-ignore
import * as adsAdapter from '@swagger-api/apidom-ns-api-design-systems/adapters/json';
// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';
import adsExpected from './fixtures/ads/ads-expected';

const adsLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ads', 'ads.json'))
  .toString();

describe('ads test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('lint ads', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/adsLint.json',
      'json',
      0,
      adsLint,
    );

    // const result = await adsAdapter.parse(adsLint);
    // const result = await adsAdapter.parse(adsLint);
    // console.log(JSON.stringify(result, null, 2));
    const result = await languageService.doValidation(doc, validationContext);
    console.log(JSON.stringify(result, null, 2));
    // assert.deepEqual(result, adsExpected as Diagnostic[]);
  });
});
