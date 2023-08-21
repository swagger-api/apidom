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
            'Reference Error - EvaluationJsonPointerError: Evaluation failed on token: "invalid" for pointer "/components/schemas/invalid"',
          severity: 1,
          code: 'test',
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
            'Reference Error - EvaluationJsonPointerError: Evaluation failed on token: "PetInvalid" for pointer "/components/schemas/PetInvalid"',
          severity: 1,
          code: 'test',
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
          message: 'Reference Error - AxiosError: Request failed with status code 404',
          severity: 1,
          code: 'test',
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
            'Reference Error - EvaluationJsonPointerError: Evaluation failed on token: "PetInvalid" for pointer "/components/schemas/PetInvalid"',
          severity: 1,
          code: 'test',
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
            'Reference Error - EvaluationJsonPointerError: Evaluation failed on token: "invalid" for pointer "/components/schemas/invalid"',
          severity: 1,
          code: 'test',
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
});
