import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { createHTTPServer, ServerTerminable } from './helpers.ts';
import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ReferenceValidationMode,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logLevel, logPerformance } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'deref', 'invalid.json')).toString();
const specValid = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref', 'valid-same-ref.json'))
  .toString();
const specValidAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref', 'valid-async.yaml'))
  .toString();

describe('reference validation', function () {
  const lsContext: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(lsContext);

  context('given doc with references', function () {
    const httpPort = 8123;
    let httpServer: ServerTerminable;

    beforeEach(function () {
      const cwd = path.join(__dirname, 'fixtures', 'deref');
      httpServer = createHTTPServer({ port: httpPort, cwd });
    });

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
            'Reference Error - JSONPointerKeyError: Invalid object key "invalid" at position 2 in "/components/schemas/invalid": key not found in object',
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
            'Reference Error - JSONPointerKeyError: Invalid object key "PetInvalid" at position 2 in "/components/schemas/PetInvalid": key not found in object',
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
          message: 'Reference Error - AxiosError: Request failed with status code 404',
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
            'Reference Error - JSONPointerKeyError: Invalid object key "PetInvalid" at position 2 in "/components/schemas/PetInvalid": key not found in object',
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
              'Reference Error - JSONPointerKeyError: Invalid object key "invalid" at position 2 in "/components/schemas/invalid": key not found in object',
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
              'Reference Error - JSONPointerKeyError: Invalid object key "PetInvalid" at position 2 in "/components/schemas/PetInvalid": key not found in object',
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
            message: 'Reference Error - AxiosError: Request failed with status code 404',
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
              'Reference Error - JSONPointerKeyError: Invalid object key "PetInvalid" at position 2 in "/components/schemas/PetInvalid": key not found in object',
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
            'Reference Error - JSONPointerKeyError: Invalid object key "invalid" at position 2 in "/components/schemas/invalid": key not found in object',
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
    specify('should validate valid async spec with apidom-reference', async function () {
      this.timeout(10000);
      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
        referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
      };

      const doc: TextDocument = TextDocument.create(
        'foo://bar/specValidAsync.json',
        'json',
        0,
        specValidAsync,
      );

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
    });
  });
});
