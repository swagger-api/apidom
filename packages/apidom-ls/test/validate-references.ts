import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import fs from 'node:fs';

import { createHTTPServer, ServerTerminable } from './helpers';
import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ReferenceValidationMode,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logLevel, logPerformance } from './test-utils';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'deref', 'invalid.json')).toString();
const specValid = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref', 'valid-same-ref.json'))
  .toString();
const specFullExternal = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref', 'invalid-full.json'))
  .toString();

describe('reference validation', function () {
  const lsContext: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(lsContext);

  context('given doc with invalid references', function () {
    const httpPort = 8123;
    let httpServer: ServerTerminable;

    // eslint-disable-next-line mocha/no-hooks-for-single-case
    beforeEach(function () {
      const cwd = path.join(__dirname, 'fixtures', 'deref');
      httpServer = createHTTPServer({ port: httpPort, cwd });
    });

    // eslint-disable-next-line mocha/no-hooks-for-single-case
    afterEach(async function () {
      languageService.terminate();
      await httpServer.terminate();
    });

    specify('should validate with apidom-reference including external refs', async function () {
      this.timeout(10000);
      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
        referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
      };

      const doc: TextDocument = TextDocument.create('foo://bar/invalid.json', 'json', 0, spec);

      const valRes = await languageService.doValidation(doc, validationContext);
      const exp = [
        {
          range: { start: { line: 23, character: 26 }, end: { line: 23, character: 56 } },
          message:
            'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "invalid" against an ObjectElement  at "/components/schemas/invalid"',
          severity: 1,
          code: '549-30-1693572091371',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
        {
          range: { start: { line: 38, character: 26 }, end: { line: 38, character: 96 } },
          message:
            'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "PetInvalid" against an ObjectElement  at "/components/schemas/PetInvalid"',
          severity: 1,
          code: '1048-70-1693572091371',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
        {
          range: { start: { line: 43, character: 26 }, end: { line: 43, character: 117 } },
          message: 'Reference Error - AxiosError: Request failed with status code 404 ',
          severity: 1,
          code: '1243-91-1693572091371',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
        {
          range: { start: { line: 63, character: 16 }, end: { line: 63, character: 99 } },
          message:
            'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "PetInvalid" against an ObjectElement  at "/components/schemas/PetInvalid"',
          severity: 1,
          code: '1703-83-1693572091371',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
      ];
      assert.deepEqual(
        valRes.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }),
        exp.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }) as Diagnostic[],
      );
    });
    specify(
      'should validate with apidom-reference including external refs with serial processing',
      async function () {
        this.timeout(10000);

        const validationContext: ValidationContext = {
          comments: DiagnosticSeverity.Error,
          maxNumberOfProblems: 100,
          relatedInformation: false,
          referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
          referenceValidationSequentialProcessing: true,
        };

        const doc: TextDocument = TextDocument.create('foo://bar/invalid.json', 'json', 0, spec);

        const valRes = await languageService.doValidation(doc, validationContext);
        const exp = [
          {
            range: { start: { line: 23, character: 26 }, end: { line: 23, character: 56 } },
            message:
              'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "invalid" against an ObjectElement  at "/components/schemas/invalid"',
            severity: 1,
            code: '549-30-1693572190252',
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: 'update to #/components/schemas/example',
                  action: 'updateValue',
                  functionParams: ['#/components/schemas/example'],
                },
              ],
            },
          },
          {
            range: { start: { line: 38, character: 26 }, end: { line: 38, character: 96 } },
            message:
              'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "PetInvalid" against an ObjectElement  at "/components/schemas/PetInvalid"',
            severity: 1,
            code: '1048-70-1693572190325',
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: 'update to #/components/schemas/example',
                  action: 'updateValue',
                  functionParams: ['#/components/schemas/example'],
                },
              ],
            },
          },
          {
            range: { start: { line: 43, character: 26 }, end: { line: 43, character: 117 } },
            message: 'Reference Error - AxiosError: Request failed with status code 404 ',
            severity: 1,
            code: '1243-91-1693572191128',
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: 'update to #/components/schemas/example',
                  action: 'updateValue',
                  functionParams: ['#/components/schemas/example'],
                },
              ],
            },
          },
          {
            range: { start: { line: 63, character: 16 }, end: { line: 63, character: 99 } },
            message:
              'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "PetInvalid" against an ObjectElement  at "/components/schemas/PetInvalid"',
            severity: 1,
            code: '1703-83-1693572191343',
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: 'update to #/components/schemas/example',
                  action: 'updateValue',
                  functionParams: ['#/components/schemas/example'],
                },
              ],
            },
          },
        ];
        assert.deepEqual(
          valRes.map((value) => {
            // eslint-disable-next-line no-param-reassign
            value.code = 'test';
            return value;
          }),
          exp.map((value) => {
            // eslint-disable-next-line no-param-reassign
            value.code = 'test';
            return value;
          }) as Diagnostic[],
        );
      },
    );
    specify(
      'should validate valid spec with apidom-reference including external refs with concurrent processing',
      async function () {
        this.timeout(10000);

        const validationContext: ValidationContext = {
          comments: DiagnosticSeverity.Error,
          maxNumberOfProblems: 100,
          relatedInformation: false,
          referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
        };

        const doc: TextDocument = TextDocument.create('foo://bar/valid.json', 'json', 0, specValid);

        const valRes = await languageService.doValidation(doc, validationContext);
        const exp: Diagnostic[] = [];
        assert.deepEqual(
          valRes.map((value) => {
            // eslint-disable-next-line no-param-reassign
            value.code = 'test';
            return value;
          }),
          exp.map((value) => {
            // eslint-disable-next-line no-param-reassign
            value.code = 'test';
            return value;
          }) as Diagnostic[],
        );
      },
    );
    specify('should validate with apidom-reference excluding external refs', async function () {
      this.timeout(10000);
      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
        referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT,
      };

      const doc: TextDocument = TextDocument.create('foo://bar/invalid.json', 'json', 0, spec);

      const valRes = await languageService.doValidation(doc, validationContext);
      const exp = [
        {
          range: { start: { line: 23, character: 26 }, end: { line: 23, character: 56 } },
          message:
            'Reference Error - EvaluationJsonPointerError: JSON Pointer evaluation failed while evaluating token "invalid" against an ObjectElement  at "/components/schemas/invalid"',
          severity: 1,
          code: '549-30-1693572773556',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
      ];
      assert.deepEqual(
        valRes.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }),
        exp.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }) as Diagnostic[],
      );
    });
    specify('should validate with legacy logic', async function () {
      this.timeout(10000);
      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const doc: TextDocument = TextDocument.create('foo://bar/invalid.json', 'json', 0, spec);

      const valRes = await languageService.doValidation(doc, validationContext);
      const exp = [
        {
          range: { start: { line: 23, character: 26 }, end: { line: 23, character: 56 } },
          message: 'local reference not found',
          severity: 1,
          code: '549-30-1692872384913',
          source: 'apilint',
          data: {
            quickFix: [
              {
                message: 'update to #/components/schemas/example',
                action: 'updateValue',
                functionParams: ['#/components/schemas/example'],
              },
            ],
          },
        },
      ];
      assert.deepEqual(
        valRes.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }),
        exp.map((value) => {
          // eslint-disable-next-line no-param-reassign
          value.code = 'test';
          return value;
        }) as Diagnostic[],
      );
    });
  });
  // measure performance of validation with concurrent and serial processing
  // using external references as input, to be run manually kept here for reference
  // eslint-disable-next-line mocha/no-skipped-tests
  specify.skip('should measure validation performance', async function () {
    const sleep = (delay: number | undefined) =>
      new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    this.timeout(50000);
    const localLsContext: LanguageServiceContext = {
      metadata: metadata(),
      validatorProviders: [],
      performanceLogs: true,
      logLevel,
    };

    let validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
      referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
      referenceValidationSequentialProcessing: true,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/invalid.json',
      'json',
      0,
      specFullExternal,
    );
    console.log('serial processing');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000);
      let localLanguageService: LanguageService | null = getLanguageService(localLsContext);
      // eslint-disable-next-line no-await-in-loop
      await localLanguageService.doValidation(doc, validationContext);
      localLanguageService.terminate();
      localLanguageService = null;
    }
    validationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
      referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
    };
    console.log('concurrent processing');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000);
      let localLanguageService: LanguageService | null = getLanguageService(localLsContext);
      // eslint-disable-next-line no-await-in-loop
      await localLanguageService.doValidation(doc, validationContext);
      localLanguageService.terminate();
      localLanguageService = null;
    }
  });
});
