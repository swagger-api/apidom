import * as fs from 'fs';
import * as path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import { oas } from '@stoplight/spectral-rulesets';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logLevel, logPerformance } from './test-utils';
import { SpectralValidationProvider } from '../src/services/validation/providers/spectral-validation-provider';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-spectral.yaml'))
  .toString();

const spectralFileContent = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'spectral.yaml'))
  .toString();

describe('apidom-ls-spectral-validation-provider', function () {
  it('test validation spectral provider with config as string', async function () {
    const spectralValidationProvider = new SpectralValidationProvider(spectralFileContent);

    const context: LanguageServiceContext = {
      metadata: metadata(),
      validatorProviders: [spectralValidationProvider],
      performanceLogs: logPerformance,
      logLevel,
    };
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
    const languageService: LanguageService = getLanguageService(context);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const result = await languageService.doValidation(docOpenapi, validationContext);
      const expected = [
        {
          range: { start: { line: 0, character: 0 }, end: { line: 40, character: 26 } },
          message: 'OpenAPI "servers" must be present and non-empty array.',
          severity: 1,
          code: 'oas3-api-servers',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: 'Info object must have "contact" object.',
          severity: 1,
          code: 'info-contact',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: 'Info "description" must be present and non-empty string.',
          severity: 1,
          code: 'info-description',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: '"info" property must have required property "title".',
          severity: 0,
          code: 'oas3-schema',
          source: 'spectral',
        },
        {
          range: { start: { line: 7, character: 8 }, end: { line: 23, character: 51 } },
          message: 'Operation "description" must be present and non-empty string.',
          severity: 1,
          code: 'operation-description',
          source: 'spectral',
        },
        {
          range: { start: { line: 7, character: 8 }, end: { line: 23, character: 51 } },
          message: 'Operation must have non-empty "tags" array.',
          severity: 1,
          code: 'operation-tags',
          source: 'spectral',
        },
      ] as Diagnostic[];
      assert.deepEqual(result, expected as Diagnostic[]);
    } finally {
      languageService.terminate();
    }
  });

  it('test validation spectral provider with config as ruleset', async function () {
    const ruleset = {
      extends: [oas],
      rules: {},
    };
    // const spectralValidationProvider = new SpectralValidationProvider(ruleset);
    const spectralValidationProvider = new SpectralValidationProvider(ruleset);

    const context: LanguageServiceContext = {
      metadata: metadata(),
      validatorProviders: [spectralValidationProvider],
      performanceLogs: logPerformance,
      logLevel,
    };

    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
    const languageService: LanguageService = getLanguageService(context);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const result = await languageService.doValidation(docOpenapi, validationContext);
      const expected = [
        {
          range: { start: { line: 0, character: 0 }, end: { line: 40, character: 26 } },
          message: 'OpenAPI "servers" must be present and non-empty array.',
          severity: 1,
          code: 'oas3-api-servers',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: 'Info object must have "contact" object.',
          severity: 1,
          code: 'info-contact',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: 'Info "description" must be present and non-empty string.',
          severity: 1,
          code: 'info-description',
          source: 'spectral',
        },
        {
          range: { start: { line: 1, character: 5 }, end: { line: 2, character: 15 } },
          message: '"info" property must have required property "title".',
          severity: 0,
          code: 'oas3-schema',
          source: 'spectral',
        },
        {
          range: { start: { line: 7, character: 8 }, end: { line: 23, character: 51 } },
          message: 'Operation "description" must be present and non-empty string.',
          severity: 1,
          code: 'operation-description',
          source: 'spectral',
        },
        {
          range: { start: { line: 7, character: 8 }, end: { line: 23, character: 51 } },
          message: 'Operation must have non-empty "tags" array.',
          severity: 1,
          code: 'operation-tags',
          source: 'spectral',
        },
      ] as Diagnostic[];
      assert.deepEqual(result, expected as Diagnostic[]);
    } finally {
      languageService.terminate();
    }
  });
});
