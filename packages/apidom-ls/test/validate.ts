import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, CodeAction } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider.ts';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider.ts';
import { Asyncapi21JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-21-json-schema-validation-provider.ts';
import { Asyncapi22JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-22-json-schema-validation-provider.ts';
import openapiSchemaJson30 from '../src/services/validation/json-schema/open-api-30/openapi-schema-idea-draft7.json' with { type: 'json' };
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specOpenapiSimple = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ajv-simple-api.json'))
  .toString();

const specAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation.json'))
  .toString();

const specAsyncYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-yaml.yaml'))
  .toString();

const specAsyncYaml21 = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-yaml-2.1.0.yaml'))
  .toString();

const specAsyncYaml22 = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-yaml-2.2.0.yaml'))
  .toString();

const specAsyncYamlNoDesc = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-nodesc.yaml'))
  .toString();

const specAsyncYamlAdditionalItems = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'sample-api-async-validation-schema-additionalitems.yaml'),
  )
  .toString();

describe('apidom-ls-validate', function () {
  const oasJsonSchemavalidationProvider = new OpenAPi31JsonSchemaValidationProvider();
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();
  const async21JsonSchemavalidationProvider = new Asyncapi21JsonSchemaValidationProvider();
  const async22JsonSchemavalidationProvider = new Asyncapi22JsonSchemaValidationProvider();
  const oasJsonSchemavalidationProvider30 = new OpenAPi31JsonSchemaValidationProvider(
    openapiSchemaJson30,
    false,
  );

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [
      oasJsonSchemavalidationProvider,
      asyncJsonSchemavalidationProvider,
      async21JsonSchemavalidationProvider,
      async22JsonSchemavalidationProvider,
    ],
    performanceLogs: logPerformance,
    logLevel,
  };

  const metadataNoTitle = JSON.parse(JSON.stringify(metadata()));
  metadataNoTitle.metadataMaps.asyncapi.info.lint.splice(3, 1);

  const contextNoTitle: LanguageServiceContext = {
    metadata: metadataNoTitle,
    validatorProviders: [
      oasJsonSchemavalidationProvider,
      asyncJsonSchemavalidationProvider,
      async21JsonSchemavalidationProvider,
      async22JsonSchemavalidationProvider,
    ],
    performanceLogs: logPerformance,
    logLevel,
  };

  const context30: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [
      oasJsonSchemavalidationProvider30,
      asyncJsonSchemavalidationProvider,
      async21JsonSchemavalidationProvider,
      async22JsonSchemavalidationProvider,
    ],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextNoSchema: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test validation for asyncapi and openapi', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/openapi.json',
      'specOpenapiSimple',
      0,
      specOpenapiSimple,
    );
    const docAsyncapi: TextDocument = TextDocument.create(
      'foo://bar/specAsync.json',
      'json',
      0,
      specAsync,
    );

    const docAsyncapiYaml: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYaml.yaml',
      'yaml',
      0,
      specAsyncYaml,
    );

    const languageService: LanguageService = getLanguageService(context);

    let result = await languageService.doValidation(docOpenapi, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 18,
            character: 18,
          },
          end: {
            line: 18,
            character: 24,
          },
        },
        message: 'must be equal to one of the allowed values',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 18,
            character: 18,
          },
          end: {
            line: 18,
            character: 24,
          },
        },
        message: 'must be array',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 18,
            character: 18,
          },
          end: {
            line: 18,
            character: 24,
          },
        },
        message: 'must match a schema in anyOf',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 19,
            character: 18,
          },
          end: {
            line: 19,
            character: 36,
          },
        },
        message: 'must be number',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 15,
          },
        },
        message: 'must match "else" schema',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 5020101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 19,
            character: 38,
          },
          end: {
            line: 19,
            character: 42,
          },
        },
        message: "'exclusiveMaximum' value must be a number",
        severity: 1,
        code: 10016,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: {
            line: 18,
            character: 26,
          },
          end: {
            line: 18,
            character: 35,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    result = await languageService.doValidation(docAsyncapi, validationContext);
    const expectedAsync = [
      {
        range: {
          start: {
            line: 3,
            character: 2,
          },
          end: {
            line: 3,
            character: 8,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 54,
            character: 20,
          },
          end: {
            line: 56,
            character: 11,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 2,
          },
          end: {
            line: 3,
            character: 8,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 55,
            character: 20,
          },
          end: {
            line: 55,
            character: 29,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expectedAsync as Diagnostic[]);
    result = await languageService.doValidation(docAsyncapiYaml, validationContext);
    assert.deepEqual(result, [
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 45,
            character: 10,
          },
          end: {
            line: 46,
            character: 4,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 45,
            character: 16,
          },
          end: {
            line: 45,
            character: 23,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ] as Diagnostic[]);

    result = await languageService.doValidation(docAsyncapi, validationContext);
    assert.deepEqual(result, expectedAsync as Diagnostic[]);
    languageService.terminate();
  });

  it('test validation for openapi with modified 3.0 schema', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/specOpenapiSimple.json',
      'json',
      0,
      specOpenapiSimple,
    );

    const languageService: LanguageService = getLanguageService(context30);

    const result = await languageService.doValidation(docOpenapi, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 19,
            character: 18,
          },
          end: {
            line: 19,
            character: 36,
          },
        },
        message: 'must be number',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 17,
            character: 16,
          },
          end: {
            line: 17,
            character: 24,
          },
        },
        message: "must have required property '$ref'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 17,
            character: 16,
          },
          end: {
            line: 17,
            character: 24,
          },
        },
        message: 'must NOT have additional properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 17,
            character: 16,
          },
          end: {
            line: 17,
            character: 24,
          },
        },
        message: 'must NOT have additional properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 17,
            character: 16,
          },
          end: {
            line: 17,
            character: 24,
          },
        },
        message: 'must match exactly one schema in oneOf',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 15,
          },
        },
        message: "must have required property '$ref'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 15,
          },
        },
        message: 'must NOT have additional properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 15,
          },
        },
        message: 'must NOT have additional properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 15,
          },
        },
        message: 'must match exactly one schema in oneOf',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 26,
            character: 6,
          },
          end: {
            line: 26,
            character: 12,
          },
        },
        message: "must have required property 'responses'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 31,
            character: 6,
          },
          end: {
            line: 31,
            character: 12,
          },
        },
        message: "must have required property 'responses'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 36,
            character: 6,
          },
          end: {
            line: 36,
            character: 11,
          },
        },
        message: "must have required property 'responses'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 5020101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 19,
            character: 38,
          },
          end: {
            line: 19,
            character: 42,
          },
        },
        message: "'exclusiveMaximum' value must be a number",
        severity: 1,
        code: 10016,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: {
            line: 18,
            character: 26,
          },
          end: {
            line: 18,
            character: 35,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    languageService.terminate();
  });
  it('test asyncapi validation parsed and cached', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const docAsyncapi: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYamlNoDesc.json',
      'json',
      0,
      specAsyncYamlNoDesc,
    );

    const languageService: LanguageService = getLanguageService(context);

    let result = await languageService.doValidation(docAsyncapi, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 70101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    result = await languageService.doValidation(docAsyncapi, validationContext);
    assert.deepEqual(result, expected as Diagnostic[]);
    languageService.terminate();
  });

  it('test asyncapi 2.2 validation', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const docAsyncapi22: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYaml22.json',
      'json',
      0,
      specAsyncYaml22,
    );

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doValidation(docAsyncapi22, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 45,
            character: 10,
          },
          end: {
            line: 46,
            character: 4,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 45,
            character: 16,
          },
          end: {
            line: 45,
            character: 23,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    languageService.terminate();
  });

  it('test asyncapi 2.1 validation', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const docAsyncapi21: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYaml21.json',
      'json',
      0,
      specAsyncYaml21,
    );

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doValidation(docAsyncapi21, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 45,
            character: 10,
          },
          end: {
            line: 46,
            character: 4,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 45,
            character: 16,
          },
          end: {
            line: 45,
            character: 23,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    languageService.terminate();
  });

  it('asyncapi / yaml - test lint and quickfix ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const asyncapiErrorSpec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'asyncapi-error.yaml'),
      )
      .toString();

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/asyncapiErrorSpec.json',
      'yaml',
      0,
      asyncapiErrorSpec,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    const quickFixresult = await languageService.doCodeActions(asyncapiErrorDoc, result);
    assert.deepEqual(quickFixresult, [] as CodeAction[]);
    languageService.terminate();
  });

  it('asyncapi / yaml - test schema lint and quickfix ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const asyncapiErrorSpec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-schema.yaml'))
      .toString();

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/asyncapiErrorSpecSchema.json',
      'yaml',
      0,
      asyncapiErrorSpec,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'channels'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 12,
            character: 10,
          },
          end: {
            line: 13,
            character: 0,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 6,
            character: 6,
          },
          end: {
            line: 13,
            character: 0,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 12,
            character: 16,
          },
          end: {
            line: 12,
            character: 23,
          },
        },
        message:
          'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
        severity: 1,
        code: 10001,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "update to 'null'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'boolean'",
              action: 'updateValue',
              functionParams: ['boolean'],
            },
            {
              message: "update to 'object'",
              action: 'updateValue',
              functionParams: ['object'],
            },
            {
              message: "update to 'array'",
              action: 'updateValue',
              functionParams: ['array'],
            },
            {
              message: "update to 'number'",
              action: 'updateValue',
              functionParams: ['null'],
            },
            {
              message: "update to 'string'",
              action: 'updateValue',
              functionParams: ['string'],
            },
            {
              message: "update to 'integer'",
              action: 'updateValue',
              functionParams: ['integer'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    const quickFixresult = await languageService.doCodeActions(asyncapiErrorDoc, result);
    assert.deepEqual(quickFixresult, [
      {
        title: "add 'channels' section",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 0,
                character: 0,
              },
              end: {
                line: 0,
                character: 5,
              },
            },
            message: "should always have a 'channels' section",
            severity: 1,
            code: 30102,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'channels' section",
                  action: 'addChild',
                  snippetYaml: 'channels: \n  \n',
                  snippetJson: '"channels": {\n  \n  },\n',
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 1,
                    character: 2,
                  },
                  end: {
                    line: 1,
                    character: 2,
                  },
                },
                newText: 'channels: \n  \n',
              },
            ],
          },
        },
      },
      {
        title: "add 'version' field",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 1,
                character: 0,
              },
              end: {
                line: 1,
                character: 4,
              },
            },
            message: "should always have a 'version'",
            severity: 1,
            code: 70201,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'version' field",
                  action: 'addChild',
                  snippetYaml: 'version: \n  ',
                  snippetJson: '"version": "",\n    ',
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 2,
                    character: 2,
                  },
                  end: {
                    line: 2,
                    character: 2,
                  },
                },
                newText: 'version: \n  ',
              },
            ],
          },
        },
      },
      {
        title: "update to 'null'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'null',
              },
            ],
          },
        },
      },
      {
        title: "update to 'boolean'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'boolean',
              },
            ],
          },
        },
      },
      {
        title: "update to 'object'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'object',
              },
            ],
          },
        },
      },
      {
        title: "update to 'array'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'array',
              },
            ],
          },
        },
      },
      {
        title: "update to 'number'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'null',
              },
            ],
          },
        },
      },
      {
        title: "update to 'string'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'string',
              },
            ],
          },
        },
      },
      {
        title: "update to 'integer'",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 12,
                character: 16,
              },
              end: {
                line: 12,
                character: 23,
              },
            },
            message:
              'should be equal to one of the allowed values allowedValues: boolean, object, array, number, string, integer, null',
            severity: 1,
            code: 10001,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "update to 'null'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'boolean'",
                  action: 'updateValue',
                  functionParams: ['boolean'],
                },
                {
                  message: "update to 'object'",
                  action: 'updateValue',
                  functionParams: ['object'],
                },
                {
                  message: "update to 'array'",
                  action: 'updateValue',
                  functionParams: ['array'],
                },
                {
                  message: "update to 'number'",
                  action: 'updateValue',
                  functionParams: ['null'],
                },
                {
                  message: "update to 'string'",
                  action: 'updateValue',
                  functionParams: ['string'],
                },
                {
                  message: "update to 'integer'",
                  action: 'updateValue',
                  functionParams: ['integer'],
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchema.json': [
              {
                range: {
                  start: {
                    line: 12,
                    character: 16,
                  },
                  end: {
                    line: 12,
                    character: 23,
                  },
                },
                newText: 'integer',
              },
            ],
          },
        },
      },
    ] as CodeAction[]);
    languageService.terminate();
  });
  it('asyncapi / yaml - test schema maxLength lint and quickfix ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const asyncapiErrorSpec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-maxLength.yaml'))
      .toString();

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/asyncapiErrorSpecSchemaMaxLength.json',
      'yaml',
      0,
      asyncapiErrorSpec,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'channels'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 13,
            character: 10,
          },
          end: {
            line: 13,
            character: 19,
          },
        },
        message: 'maxLength has no effect on non strings',
        severity: 2,
        code: 10003,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove maxLength',
              action: 'removeChild',
              functionParams: ['maxLength'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    const quickFixresult = await languageService.doCodeActions(asyncapiErrorDoc, result);
    assert.deepEqual(quickFixresult, [
      {
        title: "add 'channels' section",
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 0,
                character: 0,
              },
              end: {
                line: 0,
                character: 5,
              },
            },
            message: "should always have a 'channels' section",
            severity: 1,
            code: 30102,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'channels' section",
                  action: 'addChild',
                  snippetYaml: 'channels: \n  \n',
                  snippetJson: '"channels": {\n  \n  },\n',
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchemaMaxLength.json': [
              {
                range: {
                  start: {
                    line: 1,
                    character: 2,
                  },
                  end: {
                    line: 1,
                    character: 2,
                  },
                },
                newText: 'channels: \n  \n',
              },
            ],
          },
        },
      },
      {
        title: 'remove maxLength',
        kind: 'quickfix',
        diagnostics: [
          {
            range: {
              start: {
                line: 13,
                character: 10,
              },
              end: {
                line: 13,
                character: 19,
              },
            },
            message: 'maxLength has no effect on non strings',
            severity: 2,
            code: 10003,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: 'remove maxLength',
                  action: 'removeChild',
                  functionParams: ['maxLength'],
                  target: 'parent',
                },
              ],
            },
          },
        ],
        edit: {
          changes: {
            'foo://bar/asyncapiErrorSpecSchemaMaxLength.json': [
              {
                range: {
                  start: {
                    line: 13,
                    character: 10,
                  },
                  end: {
                    line: 13,
                    character: 22,
                  },
                },
                newText: '',
              },
            ],
          },
        },
      },
    ] as CodeAction[]);
    languageService.terminate();
  });
  it('asyncapi / yaml - test schema additional items element ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYamlAdditionalItems.json',
      'yaml',
      0,
      specAsyncYamlAdditionalItems,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'channels'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 6,
            character: 6,
          },
          end: {
            line: 8,
            character: 0,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 7,
            character: 6,
          },
          end: {
            line: 7,
            character: 21,
          },
        },
        message: 'additionalItems has no effect on non arrays',
        severity: 2,
        code: 10021,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove additionalItems',
              action: 'removeChild',
              functionParams: ['additionalItems'],
              target: 'parent',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 7,
            character: 23,
          },
          end: {
            line: 7,
            character: 24,
          },
        },
        message: 'additionalItems must be a schema object or a boolean JSON schema',
        severity: 1,
        code: 10020,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('asyncapi / yaml - test schema items element ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const specAsyncYamlItems = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'sample-api-async-validation-schema-items.yaml'),
      )
      .toString();

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/specAsyncYamlItems.json',
      'yaml',
      0,
      specAsyncYamlItems,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'channels'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 7,
            character: 6,
          },
          end: {
            line: 7,
            character: 11,
          },
        },
        message: 'items has no effect on non arrays',
        severity: 2,
        code: 10019,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove items',
              action: 'removeChild',
              functionParams: ['items'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('asyncapi / yaml - test server security ', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const specServers = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'async-server.yaml'))
      .toString();

    const asyncapiErrorDoc: TextDocument = TextDocument.create(
      'foo://bar/specServers.json',
      'yaml',
      0,
      specServers,
    );

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(asyncapiErrorDoc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'info'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 1,
          },
        },
        message: "must have required property 'channels'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'info' section",
        severity: 1,
        code: 30501,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'info' section",
              action: 'addChild',
              snippetYaml: 'info: \n  \n',
              snippetJson: '"info": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 18,
            character: 8,
          },
          end: {
            line: 18,
            character: 15,
          },
        },
        message: 'security keys must be included in defined security schemes',
        severity: 1,
        code: 300001,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('asyncapi / yaml - test partial key / wrong syntax', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'async-info.yaml')).toString();

    const doc: TextDocument = TextDocument.create('foo://bar/async-info.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoTitle);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 9,
          },
        },
        message: '(Error YAML syntax error)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
      {
        range: {
          start: {
            line: 0,
            character: 0,
          },
          end: {
            line: 0,
            character: 5,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 30102,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  \n',
              snippetJson: '"channels": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 4,
            line: 1,
          },
          start: {
            character: 0,
            line: 1,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test issue 2141 / example value', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'issue2141.yaml'))
      .toString();

    const doc: TextDocument = TextDocument.create('foo://bar/issue2141.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 7030101,
        message: 'The identifier field and url field are mutually exclusive.',
        range: {
          end: {
            character: 14,
            line: 6,
          },
          start: {
            character: 4,
            line: 6,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 3120101,
        data: {
          quickFix: [
            {
              action: 'addChild',
              message: "add 'description' field",
              snippetJson: '"description": "",\n    ',
              snippetYaml: 'description: \n  ',
            },
          ],
        },
        message: "should always have a 'description'",
        range: {
          end: {
            character: 13,
            line: 14,
          },
          start: {
            character: 8,
            line: 14,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        range: {
          start: {
            line: 19,
            character: 16,
          },
          end: {
            line: 19,
            character: 23,
          },
        },
        message: 'property "example" is deprecated, use "examples" instead',
        severity: 2,
        code: 10069,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove example',
              action: 'removeChild',
              functionParams: ['example'],
              target: 'parent',
            },
            {
              message: "add 'examples' field",
              action: 'addChild',
              snippetYaml: 'examples: \n  ',
              snippetJson: '"examples": ,\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: {
            line: 23,
            character: 18,
          },
          end: {
            line: 23,
            character: 23,
          },
        },
        message: 'The value field and externalValue field are mutually exclusive.',
        severity: 1,
        code: 5200300,
        source: 'apilint',
      },
      {
        range: {
          start: {
            line: 27,
            character: 18,
          },
          end: {
            line: 27,
            character: 23,
          },
        },
        message: 'The value field and externalValue field are mutually exclusive.',
        severity: 1,
        code: 5200300,
        source: 'apilint',
      },
      {
        range: {
          start: {
            line: 32,
            character: 18,
          },
          end: {
            line: 32,
            character: 23,
          },
        },
        message: 'The value field and externalValue field are mutually exclusive.',
        severity: 1,
        code: 5200300,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml 3.0 - ref is defined but not used', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-not-used-3-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-not-used-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 12, character: 4 }, end: { line: 12, character: 17 } },
        message: 'Definition was declared but never used in document',
        severity: 2,
        code: 'test',
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml 2.0 - ref is defined but not used', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-not-used-2-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-not-used-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 2 }, end: { line: 11, character: 13 } },
        message: 'Definition was declared but never used in document',
        severity: 2,
        code: 'test',
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position where can be legally placed', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-request-bodies.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 15, character: 20 }, end: { line: 15, character: 88 } },
        message:
          'requestBody schema $refs must point to a position where a Schema Object can be legally placed',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position where can be legally placed should not be reported against external refs', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-request-bodies-external.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies-external.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position naming', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-request-bodies-naming.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies-naming.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    result[1].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 12, character: 14 }, end: { line: 12, character: 43 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'update to #/components/requestBodies/MyBody',
              action: 'updateValue',
              functionParams: ['#/components/requestBodies/MyBody'],
            },
          ],
        },
      },
      {
        range: { start: { line: 12, character: 14 }, end: { line: 12, character: 43 } },
        message:
          'requestBody $refs must point to a position where a requestBody can be legally placed',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position naming should not be reported against external refs', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'ref-request-bodies-naming-external.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies-naming-external.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position naming schema', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'ref-request-bodies-naming-schema.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies-naming-schema.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    result[1].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 12, character: 14 }, end: { line: 12, character: 43 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'update to #/components/requestBodies/MyBody',
              action: 'updateValue',
              functionParams: ['#/components/requestBodies/MyBody'],
            },
          ],
        },
      },
      {
        range: { start: { line: 12, character: 14 }, end: { line: 12, character: 43 } },
        message:
          "requestBody $refs cannot point to '#/components/schemas/…', they must point to '#/components/requestBodies/…'",
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - requestBody $refs must point to a position naming schema should not be reported against external refs', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'ref-request-bodies-naming-schema-external.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-request-bodies-naming-schema-external.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - OAS3 header $Ref should point to Header Object', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-header.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/ref-header.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);
    const result = await languageService.doValidation(doc, validationContext);

    result[0].code = 'test';

    const expected: Diagnostic[] = [
      {
        code: 'test',
        data: {
          quickFix: [
            {
              action: 'updateValue',
              functionParams: ['#/components/headers/MyHeader'],
              message: 'update to #/components/headers/MyHeader',
            },
          ],
        },
        message: 'local reference not found',
        range: {
          end: {
            character: 51,
            line: 12,
          },
          start: {
            character: 20,
            line: 12,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5260300,
        data: {},
        message: 'OAS3 header $Ref should point to Header Object',
        range: {
          end: {
            character: 51,
            line: 12,
          },
          start: {
            character: 20,
            line: 12,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - OAS3 header $Ref should point to Header Object should not be reported against external refs', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-header-external.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-header-external.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);
    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - OAS3 parameter $Ref should point to Parameter Object', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-parameter.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/ref-parameter.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);
    const result = await languageService.doValidation(doc, validationContext);

    result[0].code = 'test';

    const expected: Diagnostic[] = [
      {
        code: 'test',
        data: {
          quickFix: [],
        },
        message: 'local reference not found',
        range: {
          end: {
            character: 45,
            line: 7,
          },
          start: {
            character: 14,
            line: 7,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5260400,
        data: {},
        message: 'OAS3 parameter $Ref should point to Parameter Object',
        range: {
          end: {
            character: 45,
            line: 7,
          },
          start: {
            character: 14,
            line: 7,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - OAS3 parameter $Ref should point to Parameter Object should not be reported against external refs', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'ref-parameter-external.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/ref-parameter-external.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);
    const result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas / yaml - test editor issue 3626 / inidrect ref', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'issue-editor-3626.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/issue-editor-3626.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 39, character: 12 }, end: { line: 39, character: 50 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'update to #/components/parameters/userIdRef',
              action: 'updateValue',
              functionParams: ['#/components/parameters/userIdRef'],
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test editor issue 3768 / request body', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'issue-editor-3768.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/issue-editor-3768.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 7, character: 6 }, end: { line: 7, character: 17 } },
        message: "operationId' must be unique among all operations",
        severity: 1,
        code: 3080501,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 8, character: 6 }, end: { line: 8, character: 17 } },
        message:
          'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
        severity: 2,
        code: 5130702,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 29, character: 6 }, end: { line: 29, character: 17 } },
        message:
          'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
        severity: 2,
        code: 5130702,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 36, character: 6 }, end: { line: 36, character: 17 } },
        message:
          'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
        severity: 2,
        code: 5130702,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 43, character: 6 }, end: { line: 43, character: 17 } },
        message: 'requestBody is not allowed for OPTIONS and TRACE operations',
        severity: 1,
        code: 5130701,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 50, character: 6 }, end: { line: 50, character: 17 } },
        message: 'requestBody is not allowed for OPTIONS and TRACE operations',
        severity: 1,
        code: 5130701,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 58, character: 6 }, end: { line: 58, character: 17 } },
        message: "operationId' must be unique among all operations",
        severity: 1,
        code: 3080501,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 59, character: 6 }, end: { line: 59, character: 17 } },
        message:
          'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
        severity: 2,
        code: 5130702,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test nullable hint for openapi 3.1', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'nullable-oas31.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/nullable-oas31.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 12, character: 6 }, end: { line: 12, character: 14 } },
        message: 'nullable has no special meaning, if not set on purpose use `type="null"` instead',
        severity: 4,
        code: 10071,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove nullable',
              action: 'removeChild',
              functionParams: ['nullable'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test server with variable URL', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'server-variables-url.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variables-url.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test server variable default and enum', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'server-variables.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variables.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 15, character: 6 }, end: { line: 15, character: 10 } },
        message: "'enum' must be a non-empty array of strings",
        severity: 1,
        code: 7060100,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 16, character: 17 }, end: { line: 16, character: 22 } },
        message: "'default' value must exist in the enum's values.",
        severity: 1,
        code: 7060200,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 19, character: 17 }, end: { line: 19, character: 21 } },
        message: "'default' value must exist in the enum's values.",
        severity: 1,
        code: 7060200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - test server variable default and enum 3.0', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'server-variables-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variables.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 15, character: 6 }, end: { line: 15, character: 10 } },
        message: "'enum' array should not be empty.",
        severity: 2,
        code: 5080101,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 16, character: 17 }, end: { line: 16, character: 22 } },
        message: "'default' value should exist in the enum's values.",
        severity: 2,
        code: 5080202,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 19, character: 17 }, end: { line: 19, character: 21 } },
        message: "'default' value should exist in the enum's values.",
        severity: 2,
        code: 5080202,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-openapi-yaml-2-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/openapi-2-0.yaml', 'yaml', 0, spec);
    const languageService: LanguageService = getLanguageService(contextNoSchema);
    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 5 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 5 },
        },
        message: "should always have a 'info' section",
        severity: 1,
        code: 3010101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'info' section",
              action: 'addChild',
              snippetYaml: 'info: \n  \n',
              snippetJson: '"info": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 5 },
        },
        message: "should always have a 'paths' section",
        severity: 1,
        code: 3010701,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'paths' section",
              action: 'addChild',
              snippetYaml: 'paths: \n  \n',
              snippetJson: '"paths": {\n  \n  },\n',
            },
          ],
        },
      },
    ];

    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - every path template should be defined', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'path-template-all-defined-2-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/path-template-all-defined-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 12, character: 2 }, end: { line: 12, character: 43 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 30, character: 2 }, end: { line: 30, character: 25 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 52, character: 2 }, end: { line: 52, character: 39 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 59, character: 2 }, end: { line: 59, character: 61 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 78, character: 2 }, end: { line: 78, character: 13 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - every path template should be defined', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'path-template-all-defined-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/path-template-all-defined-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 15, character: 2 }, end: { line: 15, character: 43 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 40, character: 2 }, end: { line: 40, character: 25 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 70, character: 2 }, end: { line: 70, character: 39 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 79, character: 2 }, end: { line: 79, character: 61 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 105, character: 2 }, end: { line: 105, character: 13 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.1 / yaml - every path template should be defined', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'path-template-all-defined-3-1.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/path-template-all-defined-3-1.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 15, character: 2 }, end: { line: 15, character: 43 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 40, character: 2 }, end: { line: 40, character: 25 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 70, character: 2 }, end: { line: 70, character: 39 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 79, character: 2 }, end: { line: 79, character: 61 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
      {
        range: { start: { line: 105, character: 2 }, end: { line: 105, character: 13 } },
        message: 'path template expressions is not matched with Parameter Object(s)',
        severity: 1,
        code: 3040101,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - parameter object should be defined within path template', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameter-defined-within-path-template-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-defined-within-path-template-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 20, character: 8 }, end: { line: 24, character: 20 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
      {
        range: { start: { line: 38, character: 10 }, end: { line: 46, character: 0 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - parameter object should be defined within path template', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameter-defined-within-path-template-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-defined-within-path-template-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 26, character: 8 }, end: { line: 32, character: 23 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
      {
        range: { start: { line: 84, character: 10 }, end: { line: 91, character: 0 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - parameter name should be unique', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-unique-name-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-unique-name-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 3103000,
        data: {},
        message: 'Name must be unique among all parameters',
        range: {
          end: {
            character: 14,
            line: 11,
          },
          start: {
            character: 10,
            line: 11,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 3103000,
        data: {},
        message: 'Name must be unique among all parameters',
        range: {
          end: {
            character: 14,
            line: 16,
          },
          start: {
            character: 10,
            line: 16,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - parameter name should be unique', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-unique-name-2-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-unique-name-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 3103000,
        data: {},
        message: 'Name must be unique among all parameters',
        range: {
          end: {
            character: 14,
            line: 11,
          },
          start: {
            character: 10,
            line: 11,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 3103000,
        data: {},
        message: 'Name must be unique among all parameters',
        range: {
          end: {
            character: 14,
            line: 17,
          },
          start: {
            character: 10,
            line: 17,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - enum value should conform to its parameters type', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameters-enum-type-2-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-enum-type-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 3101801,
        data: {},
        message: 'enum value should conform to its parameters type',
        range: {
          end: {
            character: 25,
            line: 12,
          },
          start: {
            character: 16,
            line: 12,
          },
        },
        severity: 2,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - parameter Authorization is ignored', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameter-in-authorization-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-in-authorization-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 5150303,
        data: {},
        message:
          'Header Parameter named "Authorization" is ignored. Use the "securitySchemes" and "security" sections instead to define authorization',
        range: {
          end: {
            character: 29,
            line: 12,
          },
          start: {
            character: 16,
            line: 12,
          },
        },
        severity: 2,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - parameter content-type is ignored', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-in-content-type-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-in-authorization-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 5150304,
        data: {},
        message:
          'Header Parameter named "Content-Type" is ignored. The values for the "Content-Type" header are defined by `requestBody.content.<media-type>`',
        range: {
          end: {
            character: 28,
            line: 12,
          },
          start: {
            character: 16,
            line: 12,
          },
        },
        severity: 2,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.0 / yaml - parameter accept is ignored', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-in-accept-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-in-accept-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 5150304,
        data: {},
        message:
          'Header Parameter named "Accept" is ignored. The values for the "Accept" header are defined by `requestBody.content.<media-type>`',
        range: {
          end: {
            character: 22,
            line: 12,
          },
          start: {
            character: 16,
            line: 12,
          },
        },
        severity: 2,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - Multiple body parameters are not allowed', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-in-multiple-body.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-in-multiple-body.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 3100203,
        data: {},
        message: 'Multiple body parameters are not allowed',
        range: {
          end: {
            character: 12,
            line: 13,
          },
          start: {
            character: 10,
            line: 13,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 3100203,
        data: {},
        message: 'Multiple body parameters are not allowed',
        range: {
          end: {
            character: 12,
            line: 16,
          },
          start: {
            character: 10,
            line: 16,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.1 / yaml - parameter object should be defined within path template', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameter-defined-within-path-template-3-1.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-defined-within-path-template-3-1.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 45, character: 8 }, end: { line: 51, character: 23 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
      {
        range: { start: { line: 103, character: 10 }, end: { line: 110, character: 0 } },
        message: 'parameter is not defined within path template',
        severity: 1,
        code: 3102000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - enum value should conform to its schemas type', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-enum-type.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-enum-type.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 16, character: 14 }, end: { line: 19, character: 0 } },
        data: {},
        message: "enum value should conform to its schema's type",
        severity: 2,
        code: 10075,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - Default values must be present in enum', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-enum-default-value.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-enum-default-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 16, character: 14 }, end: { line: 18, character: 17 } },
        data: {},
        message: 'Default values must be present in enum',
        severity: 1,
        code: 10076,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml 2.0 - Default values must be present in enum', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameters-enum-default-value-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-enum-default-value-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 16 }, end: { line: 11, character: 35 } },
        data: {},
        message: 'Default values must be present in enum',
        severity: 1,
        code: 3101802,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 3.0 - 'minimum' must be lower value than 'maximum'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-minimum-maximum-value.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-minimum-maximum-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 9, character: 16 }, end: { line: 9, character: 47 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [],
        },
      },
      {
        range: { start: { line: 13, character: 15 }, end: { line: 13, character: 16 } },
        data: {},
        message: "'minimum' must be a lower value than 'maximum'",
        severity: 1,
        code: 10077,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 3.0 - exclusive minimum: 'minimum' must be lower value than 'maximum'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'schema-exclusive-minimum-maximum-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-exclusive-minimum-maximum-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 9, character: 16 }, end: { line: 9, character: 47 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [],
        },
      },
      {
        range: { start: { line: 14, character: 15 }, end: { line: 14, character: 16 } },
        data: {},
        message: "'minimum' must be a lower value than 'maximum'",
        severity: 1,
        code: 10077,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 2.0 - 'minimum' must be lower value than 'maximum'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameters-minimum-maximum-value-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-minimum-maximum-value-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 19 }, end: { line: 11, character: 21 } },
        data: {},
        message: "'minimum' must be a lower value than 'maximum'",
        severity: 1,
        code: 3110701,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 3.0 - 'minLength' must be lower value than 'maxLength'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'schema-minimum-length-maximum-length-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-minimum-length-maximum-length-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 9, character: 16 }, end: { line: 9, character: 47 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [],
        },
      },
      {
        range: { start: { line: 13, character: 17 }, end: { line: 13, character: 18 } },
        data: {},
        message: "'minLength' must be a lower value than 'maxLength'",
        severity: 1,
        code: 10078,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 2.0 - 'minLength' must be lower value than 'maxLength'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameters-minimum-length-maximum-length-value-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-minimum-length-maximum-length-value-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 21 }, end: { line: 11, character: 23 } },
        data: {},
        message: "'minLength' must be a lower value than 'maxLength'",
        severity: 1,
        code: 3111301,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml - 'minProperties' must be lower value than 'maxProperties'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'schema-minimum-properties-maximum-properties-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-minimum-properties-maximum-properties-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 9, character: 16 }, end: { line: 9, character: 47 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [],
        },
      },
      {
        range: { start: { line: 13, character: 21 }, end: { line: 13, character: 22 } },
        data: {},
        message: "'minProperties' must be a lower value than 'maxProperties'",
        severity: 1,
        code: 10079,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 2.0 - 'minProperties' must be lower value than 'maxProperties'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameters-minimum-length-maximum-length-value-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-minimum-length-maximum-length-value-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 21 }, end: { line: 11, character: 23 } },
        data: {},
        message: "'minLength' must be a lower value than 'maxLength'",
        severity: 1,
        code: 3111301,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml - 'minItems' must be lower value than 'minItems'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'schema-minimum-items-maximum-items-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-minimum-items-maximum-items-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    result[0].code = 'test';
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 9, character: 16 }, end: { line: 9, character: 47 } },
        message: 'local reference not found',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: {
          quickFix: [],
        },
      },
      {
        range: { start: { line: 13, character: 16 }, end: { line: 13, character: 17 } },
        data: {},
        message: "'minItems' must be a lower value than 'maxItems'",
        severity: 1,
        code: 10080,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas / yaml 2.0 - 'minItems' must be lower value than 'minItems'", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'parameters-minimum-items-maximum-items-value-2-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameters-minimum-items-maximum-items-value-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 11, character: 20 }, end: { line: 11, character: 22 } },
        data: {},
        message: "'minItems' must be a lower value than 'maxItems'",
        severity: 1,
        code: 3111001,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas 3.0/ yaml - A property MUST NOT be marked 'readOnly' and 'writeOnly' being true", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-read-only-write-only.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-read-only-write-only.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10081,
        data: {},
        message: "A property MUST NOT be marked as both 'readOnly' and 'writeOnly' being true",
        range: {
          end: {
            character: 10,
            line: 30,
          },
          start: {
            character: 8,
            line: 30,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2/ yaml - Read only properties cannot be marked as required by a schema', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-read-only-required.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-read-only-required.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10082,
        data: {},
        message: 'Read only properties cannot be marked as required by a schema',
        range: {
          end: {
            character: 19,
            line: 10,
          },
          start: {
            character: 6,
            line: 10,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2/ yaml - \\Z" anchors are not allowed in regular expression patterns', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-reg-exp-anchors.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-reg-exp-anchors.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10083,
        data: {},
        message: '\\Z" anchors are not allowed in regular expression patterns',
        range: {
          end: {
            character: 31,
            line: 10,
          },
          start: {
            character: 13,
            line: 10,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it("oas 2/ yaml - should have an 'items' if 'type'=array", async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-items-required.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-items-required.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10084,
        data: {
          quickFix: [
            {
              action: 'addChild',
              message: "add 'items' field",
              snippetJson: '"items": {\n  \n  },\n',
              snippetYaml: 'items: \n  \n',
            },
          ],
        },
        message: "should have an 'items' if 'type'=array",
        range: {
          end: {
            character: 20,
            line: 12,
          },
          start: {
            character: 14,
            line: 12,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 2/ yaml - `items` must be an object', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-items-2-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-items-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10018,
        data: {},
        message: "'items' must be an object",
        range: {
          end: {
            character: 27,
            line: 12,
          },
          start: {
            character: 19,
            line: 12,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3/ yaml - `items` must be an object', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-items-3-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-items-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10018,
        data: {},
        message: "'items' must be an object",
        range: {
          end: {
            character: 0,
            line: 16,
          },
          start: {
            character: 18,
            line: 15,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas 3.1/ yaml - items must be a schema or array of schemas', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'schema-items-3-1.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/schema-items-3-1.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        code: 10018,
        data: {},
        message: 'items must be a schema or array of schemas',
        range: {
          end: {
            character: 24,
            line: 14,
          },
          start: {
            character: 23,
            line: 14,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas / yaml - schema should have at least one Schema core keyword - issue #3549', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'issue3549.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/issue3549.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 16, character: 18 }, end: { line: 16, character: 23 } },
        message: 'Schema does not include any Schema Object keywords',
        severity: 4,
        code: 10072,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('asyncapi / yaml - schema should have at least one Schema core keyword - issue #3549', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'issue3549.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/issue3549.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc, validationContext);
    const expected: Diagnostic[] = [
      {
        range: { start: { line: 36, character: 8 }, end: { line: 36, character: 13 } },
        message: 'Schema does not include any Schema Object keywords',
        severity: 4,
        code: 10072,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    languageService.terminate();
  });

  it('oas - parameters style should allow only "simple" and "form" values', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'sample-api-validation-parameters.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/sample-api-validation-parameters.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'style must be one of allowed values: form, simple',
        severity: 1,
        code: 5150800,
        source: 'apilint',
        data: {},
        range: { start: { line: 12, character: 17 }, end: { line: 12, character: 22 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas - tags name should have unique values', async function () {
    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'tags-unique-name.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/tags-unique-name.yaml',
      'yaml',
      0,
      spec,
    );
    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'Tag Objects must have unique `name` field values.',
        severity: 1,
        code: 3190400,
        source: 'apilint',
        data: {},
        range: { start: { line: 5, character: 10 }, end: { line: 5, character: 13 } },
      },
      {
        message: 'Tag Objects must have unique `name` field values.',
        severity: 1,
        code: 3190400,
        source: 'apilint',
        data: {},
        range: { start: { line: 10, character: 10 }, end: { line: 10, character: 13 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 2.0 every scope should be resolved', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'security-scopes-unresolved.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-scopes-unresolved.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'Security scope definition could not be resolved',
        severity: 1,
        code: 3220802,
        source: 'apilint',
        range: { start: { line: 21, character: 4 }, end: { line: 21, character: 50 } },
      },
    ];

    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 2.0 every defined security scheme should be used', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'security-scheme-not-used-2-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-scheme-not-used-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Security Scheme was defined but never used. To apply security, use the `security` section in operations or on the root level of your API definition',
        severity: 2,
        code: 14998,
        source: 'apilint',
        range: { start: { line: 20, character: 2 }, end: { line: 20, character: 15 } },
      },
    ];

    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 3.0 every defined security scheme should be used', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'security-scheme-not-used-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-scheme-not-used-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Security Scheme was defined but never used. To apply security, use the `security` section in operations or on the root level of your API definition',
        severity: 2,
        code: 14998,
        source: 'apilint',
        range: { start: { line: 25, character: 4 }, end: { line: 25, character: 17 } },
      },
    ];

    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 3.0 every defined security scheme used locally', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'security-scheme-used-locally-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-scheme-used-locally-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);

    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas 3.0 every defined security scheme used globally', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'security-scheme-used-globally-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-scheme-used-globally-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);

    assert.deepEqual(result, []);

    languageService.terminate();
  });

  it('oas every security requirement should be an array', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'security-requirement-not-array.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'security-requirement-not-array.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        code: 14997,
        message: 'must be an array',
        range: {
          end: {
            character: 28,
            line: 27,
          },
          start: {
            character: 4,
            line: 27,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 14997,
        message: 'must be an array',
        range: {
          end: {
            character: 28,
            line: 40,
          },
          start: {
            character: 10,
            line: 40,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];

    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 2.0 / yaml - Parameters cannot have both a "in: body" and "in: formData"', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'parameter-in-overlaps.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-in-overlaps.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Parameters cannot have both a "in: body" and "in: formData", as "formData" _will_ be the body',
        severity: 1,
        code: 3100204,
        source: 'apilint',
        data: {},
        range: { start: { line: 9, character: 6 }, end: { line: 9, character: 16 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it("oas 2.0 / yaml - should complain if 'type:file' and no consumes - 'multipart/form-data'", async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'operation-type-consumes-required.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-type-consumes-required.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Operations with Parameter of "type: file" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080801,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
      {
        message:
          'Operations with Parameter of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080802,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it("oas 2.0 / yaml - should complain if 'type:file' and consumes wrong value", async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'operation-type-consumes-value.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-type-consumes-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Operations with Parameter of "type: file" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080801,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
      {
        message:
          'Operations with Parameter of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080802,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });
  it("oas 2.0 / yaml - should complain if 'in:formData` and no consumes - 'multipart/form-data'", async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'operation-in-consumes-required.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-in-consumes-required.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Operations with Parameter of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080802,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it("oas 2.0 / yaml - should complain if 'type:file` and consumes wrong value", async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'operation-in-consumes-value.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-in-consumes-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message:
          'Operations with Parameter of "in: formData" must include "application/x-www-form-urlencoded" or "multipart/form-data" in their "consumes" property',
        severity: 1,
        code: 3080802,
        source: 'apilint',
        data: {},
        range: { start: { line: 6, character: 4 }, end: { line: 6, character: 7 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it("oas 2.0 / yaml - should not complain if 'type:file` and consumes is defined at root level", async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'operation-type-consumes-global-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-type-consumes-global-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it("oas 2.0 / yaml - should not complain if 'type:file` and wrong global consumes is overridden at operation level", async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'operation-type-consumes-override-value.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-type-consumes-override-value.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });
  it('oas 2.0 should not allow equivalent paths', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'oas',
          'path-template-equivalent-not-allowed.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'path-template-equivalent-not-allowed.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'Equivalent paths are not allowed',
        severity: 1,
        code: 3040102,
        source: 'apilint',
        range: { start: { line: 16, character: 2 }, end: { line: 16, character: 17 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 2.0 - Responses Object should define at least one response', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'responses-required-fields-2-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/responses-required-fields-2-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'Responses Object should define at least one response',
        severity: 1,
        code: 3250001,
        source: 'apilint',
        range: { start: { line: 7, character: 6 }, end: { line: 7, character: 15 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('oas 3.x - Responses Object should define at least one response', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'oas', 'responses-required-fields-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/responses-required-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: 'Responses Object should define at least one response',
        severity: 1,
        code: 3250001,
        source: 'apilint',
        range: { start: { line: 7, character: 6 }, end: { line: 7, character: 15 } },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - AsyncAPI Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'root-fields-required-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/root-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        message: "should always have a 'info' section",
        severity: 1,
        code: 2010501,
        source: 'apilint',
        range: { start: { line: 0, character: 0 }, end: { line: 0, character: 5 } },
        data: {
          quickFix: [
            {
              action: 'addChild',
              message: "add 'info' section",
              snippetJson: '"info": {\n  \n  },\n',
              snippetYaml: 'info: \n  \n',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - AsyncAPI Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'root-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/root-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 5, character: 4 },
          end: { line: 5, character: 7 },
        },
        message: "'id' value must be a valid URI",
        severity: 1,
        code: 2010400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 1, character: 6 },
          end: { line: 1, character: 10 },
        },
        message: 'info must be an object',
        severity: 1,
        code: 2010500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 9 },
          end: { line: 6, character: 13 },
        },
        message: 'servers must be an object',
        severity: 1,
        code: 2010600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 4, character: 20 },
          end: { line: 4, character: 23 },
        },
        message: "'defaultContentType' value must be a string",
        severity: 1,
        code: 2010300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 2, character: 10 },
          end: { line: 2, character: 14 },
        },
        message: 'channels must be an object',
        severity: 1,
        code: 2010101,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 3, character: 12 },
          end: { line: 3, character: 16 },
        },
        message: 'components must be an object',
        severity: 1,
        code: 2010200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Channel Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'channel-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/channel-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 17 },
          end: { line: 6, character: 20 },
        },
        message: "description' value must be a string",
        severity: 1,
        code: 2020100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 5, character: 2 },
          end: { line: 5, character: 10 },
        },
        message: '"parameters" must be of Parameters Object shape',
        severity: 1,
        code: 2020200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 4 },
          end: { line: 7, character: 12 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 2020300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Channel Bindings Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'channel-bindings-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/channel-bindings-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 11, character: 12 },
          end: { line: 11, character: 16 },
        },
        message: '"http" must be a HTTP Channel Binding',
        severity: 1,
        code: 180100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: '"amqp" must be a AMQP Channel Binding',
        severity: 1,
        code: 180500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 17 },
        },
        message: '"amqp1" must be a AMQP 1.0 Channel Binding',
        severity: 1,
        code: 180600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 22 },
        },
        message: '"anypointmq" must be a Anypoint MQ Channel Binding',
        severity: 1,
        code: 180400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 13 },
          end: { line: 12, character: 17 },
        },
        message: '"ibmmq" must be a IBM MQ Channel Binding',
        severity: 1,
        code: 181700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 11 },
          end: { line: 13, character: 15 },
        },
        message: '"jms" must be a JMS Channel Binding',
        severity: 1,
        code: 181000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 13 },
          end: { line: 14, character: 17 },
        },
        message: '"kafka" must be a Kafka Channel Binding',
        severity: 1,
        code: 180300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 15, character: 15 },
          end: { line: 15, character: 19 },
        },
        message: '"mercure" must be a Mercure Channel Binding',
        severity: 1,
        code: 181600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 12 },
          end: { line: 16, character: 16 },
        },
        message: '"mqtt" must be a MQTT Channel Binding',
        severity: 1,
        code: 180700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 13 },
          end: { line: 17, character: 17 },
        },
        message: '"mqtt5" must be a MQTT 5 Channel Binding',
        severity: 1,
        code: 180800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 12 },
          end: { line: 18, character: 16 },
        },
        message: '"nats" must be a NATS Channel Binding',
        severity: 1,
        code: 180900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 20, character: 13 },
          end: { line: 20, character: 17 },
        },
        message: '"redis" must be a Redis Channel Binding',
        severity: 1,
        code: 181500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 11 },
          end: { line: 21, character: 15 },
        },
        message: '"sns" must be a SNS Channel Binding',
        severity: 1,
        code: 181100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 22, character: 14 },
          end: { line: 22, character: 18 },
        },
        message: '"solace" must be a Solace Channel Binding',
        severity: 1,
        code: 181200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 11 },
          end: { line: 23, character: 15 },
        },
        message: '"sqs" must be a SQS Channel Binding',
        severity: 1,
        code: 181300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 24, character: 13 },
          end: { line: 24, character: 17 },
        },
        message: '"stomp" must be a STOMP Channel Binding',
        severity: 1,
        code: 181400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 10 },
          end: { line: 25, character: 14 },
        },
        message: '"ws" must be a WebSockets Channel Binding',
        severity: 1,
        code: 180200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 20 },
          end: { line: 10, character: 24 },
        },
        message: '"googlepubsub" must be a Google Cloud Pub/Sub Channel Binding',
        severity: 1,
        code: 181900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 14 },
          end: { line: 19, character: 18 },
        },
        message: '"pulsar" must be a Pulsar Channel Binding',
        severity: 1,
        code: 182000,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Channel Bindings Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'channel-bindings-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/channel-bindings-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Channel Bindings Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'channel-bindings-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/channel-bindings-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 181800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 4 },
          end: { line: 9, character: 12 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 181801,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Components Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'components-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 25, character: 2 },
          end: { line: 25, character: 9 },
        },
        message: '"servers" values must be Server object',
        severity: 1,
        code: 260200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 2 },
          end: { line: 23, character: 17 },
        },
        message: '"servers" members must be Server Variable object',
        severity: 1,
        code: 260300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 2 },
          end: { line: 13, character: 10 },
        },
        message: '"messages" members must be Message object',
        severity: 1,
        code: 260500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 2 },
          end: { line: 19, character: 17 },
        },
        message: '"securitySchemes" members must be Security Scheme Object',
        severity: 1,
        code: 260600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 2 },
          end: { line: 17, character: 12 },
        },
        message: '"parameters" members must be Parameter object',
        severity: 1,
        code: 260700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 2 },
          end: { line: 7, character: 16 },
        },
        message: '"correlationIds" members must be Correlation ID Object',
        severity: 1,
        code: 260800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 2 },
          end: { line: 11, character: 15 },
        },
        message: '"messageTraits" members must be Security Scheme Object',
        severity: 1,
        code: 261000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 2 },
          end: { line: 21, character: 16 },
        },
        message: '"serverBindings" members must be Server Bindings Object',
        severity: 1,
        code: 261100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 5, character: 2 },
          end: { line: 5, character: 17 },
        },
        message: '"channelBindings" values must be of Channel Bindings Object shape',
        severity: 1,
        code: 261200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 15, character: 2 },
          end: { line: 15, character: 19 },
        },
        message: '"operationBindings" members must be Operation Bindings Object',
        severity: 1,
        code: 261300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 2 },
          end: { line: 9, character: 17 },
        },
        message: '"messageBindings" members must be Message Bindings Object',
        severity: 1,
        code: 261400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Components Object keys pattern', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'components-keys-pattern-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-keys-pattern-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 0 },
          end: { line: 4, character: 10 },
        },
        message: 'components keys must match the regular expression: `^[a-zA-Z0-9\\.\\-_]+$`',
        severity: 1,
        code: 260001,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Contact Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'contact-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/contact-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 2 },
          end: { line: 4, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Contact Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'contact-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/contact-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 5, character: 10 },
          end: { line: 5, character: 13 },
        },
        message: "'name' must be a string",
        severity: 1,
        code: 80100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 11 },
          end: { line: 7, character: 15 },
        },
        message: "'email' must be a valid email",
        severity: 1,
        code: 80200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 9 },
          end: { line: 6, character: 13 },
        },
        message: "'url' value must be a valid URL",
        severity: 1,
        code: 80300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Correlation ID Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'correlation-id-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/correlation-id-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 18 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Correlation ID Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'correlation-id-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/correlation-id-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 310100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 16 },
          end: { line: 7, character: 19 },
        },
        message: "'location' value must be a string",
        severity: 1,
        code: 310200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Correlation ID Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'correlation-id-fields-required-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/correlation-id-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 18 },
        },
        message: "should always have a 'location'",
        severity: 1,
        code: 310201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'location' field",
              action: 'addChild',
              snippetYaml: 'location: \n  ',
              snippetJson: '"location": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Correlation ID Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'correlation-id-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/correlation-id-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 310300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 18 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 310301,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - External Documentation Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'external-docs-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/external-docs-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 250100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 11 },
          end: { line: 7, character: 15 },
        },
        message: "'url' value must be a valid URL",
        severity: 1,
        code: 250200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Info Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'info-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/info-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 2, character: 9 },
          end: { line: 2, character: 12 },
        },
        message: 'title must be a string',
        severity: 1,
        code: 70100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 3, character: 11 },
          end: { line: 3, character: 14 },
        },
        message: 'version must be a string',
        severity: 1,
        code: 70200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 5, character: 15 },
          end: { line: 5, character: 18 },
        },
        message: 'description must be a string',
        severity: 1,
        code: 70300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 18 },
          end: { line: 7, character: 21 },
        },
        message: 'termsOfService MUST be in the format of a URL.',
        severity: 1,
        code: 70400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 4, character: 11 },
          end: { line: 4, character: 14 },
        },
        message: 'contact must be an object',
        severity: 1,
        code: 70500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 11 },
          end: { line: 6, character: 14 },
        },
        message: 'license must be an object',
        severity: 1,
        code: 70600,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Info Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'info-fields-required-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/info-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 1, character: 0 },
          end: { line: 1, character: 4 },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 70201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 1, character: 0 },
          end: { line: 1, character: 4 },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 70101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - License Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'license-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/license-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 2 },
          end: { line: 4, character: 9 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - License Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'license-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/license-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 5, character: 10 },
          end: { line: 5, character: 13 },
        },
        message: "'name' must be a string",
        severity: 1,
        code: 90100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 9 },
          end: { line: 6, character: 13 },
        },
        message: "'url' value must be a valid URL",
        severity: 1,
        code: 90200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - License Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'license-fields-required-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/license-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 2 },
          end: { line: 4, character: 9 },
        },
        message: "should always have a 'name' value",
        severity: 1,
        code: 90101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'name' section",
              action: 'addChild',
              snippetYaml: 'name: \n    ',
              snippetJson: '"name": "",\n      ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 21 },
          end: { line: 9, character: 24 },
        },
        message: "'correlationId' must be a Correlation ID",
        severity: 1,
        code: 210300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'contentType' value must be a string",
        severity: 1,
        code: 210500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 12 },
          end: { line: 13, character: 15 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 210600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 13 },
          end: { line: 16, character: 16 },
        },
        message: "'title' value must be a string",
        severity: 1,
        code: 210700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 15 },
          end: { line: 14, character: 18 },
        },
        message: "'summary' value must be a string",
        severity: 1,
        code: 210800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 19 },
          end: { line: 10, character: 22 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 210900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: 'tags must be an array of Tags',
        severity: 1,
        code: 211000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 20 },
          end: { line: 12, character: 23 },
        },
        message: 'externalDocs must be an object',
        severity: 1,
        code: 211100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 14 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 211200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: "'examples' must be an array of Message Example Objects",
        severity: 1,
        code: 211300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: "'examples' must be an array of Message Example Objects",
        severity: 1,
        code: 211301,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: "'traits' must be an array of Message Trait Objects",
        severity: 1,
        code: 211400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 12 },
        },
        message: "'traits' must be an array of Message Trait Objects",
        severity: 1,
        code: 211401,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 211500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 12 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 211501,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Example Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'message-example-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-example-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 19 },
          end: { line: 10, character: 22 },
        },
        message: "'headers' must be an object",
        severity: 1,
        code: 230100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 19 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 230200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 19 },
          end: { line: 9, character: 22 },
        },
        message: "'summary' value must be a string",
        severity: 1,
        code: 230300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Example Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'message-example-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-example-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 10 },
          end: { line: 9, character: 0 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Trait Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'message-trait-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-trait-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 21 },
          end: { line: 9, character: 24 },
        },
        message: "'correlationId' must be a Correlation ID",
        severity: 1,
        code: 220300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "'contentType' value must be a string",
        severity: 1,
        code: 220500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 12 },
          end: { line: 13, character: 15 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 220600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 13 },
          end: { line: 16, character: 16 },
        },
        message: "'title' value must be a string",
        severity: 1,
        code: 220700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 15 },
          end: { line: 14, character: 18 },
        },
        message: "'summary' value must be a string",
        severity: 1,
        code: 220800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 19 },
          end: { line: 10, character: 22 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 220900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 17 },
        },
        message: 'tags must be an array of Tags',
        severity: 1,
        code: 221000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 20 },
          end: { line: 12, character: 23 },
        },
        message: 'externalDocs must be an object',
        severity: 1,
        code: 221100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 14 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 221200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 17 },
        },
        message: "'examples' must be an array of Message Example Objects",
        severity: 1,
        code: 221300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 17 },
        },
        message: "'examples' must be an array of Message Example Objects",
        severity: 1,
        code: 221301,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Trait Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-trait-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-trait-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 221500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 17 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 221501,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Bindings Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'message-bindings-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-bindings-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 11, character: 12 },
          end: { line: 11, character: 16 },
        },
        message: '"http" must be a HTTP Message Binding',
        severity: 1,
        code: 200100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: '"amqp" must be a AMQP Message Binding',
        severity: 1,
        code: 200500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 17 },
        },
        message: '"amqp1" must be a AMQP 1.0 Message Binding',
        severity: 1,
        code: 200600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 22 },
        },
        message: '"anypointmq" must be a Anypoint MQ Message Binding',
        severity: 1,
        code: 200400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 13 },
          end: { line: 12, character: 17 },
        },
        message: '"ibmmq" must be a IBM MQ Message Binding',
        severity: 1,
        code: 201700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 20 },
          end: { line: 10, character: 24 },
        },
        message: '"googlepubsub" must be a GooglePubSub Message Binding',
        severity: 1,
        code: 201900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 11 },
          end: { line: 13, character: 15 },
        },
        message: '"jms" must be a JMS Message Binding',
        severity: 1,
        code: 201000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 13 },
          end: { line: 14, character: 17 },
        },
        message: '"kafka" must be a Kafka Message Binding',
        severity: 1,
        code: 200300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 15, character: 15 },
          end: { line: 15, character: 19 },
        },
        message: '"mercure" must be a Mercure Message Binding',
        severity: 1,
        code: 201600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 12 },
          end: { line: 16, character: 16 },
        },
        message: '"mqtt" must be a MQTT Message Binding',
        severity: 1,
        code: 200700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 13 },
          end: { line: 17, character: 17 },
        },
        message: '"mqtt5" must be a MQTT 5 Message Binding',
        severity: 1,
        code: 200800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 12 },
          end: { line: 18, character: 16 },
        },
        message: '"nats" must be a NATS Message Binding',
        severity: 1,
        code: 200900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 14 },
          end: { line: 19, character: 18 },
        },
        message: '"pulsar" must be a Pulsar Message Binding',
        severity: 1,
        code: 202000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 20, character: 13 },
          end: { line: 20, character: 17 },
        },
        message: '"redis" must be a Redis Message Binding',
        severity: 1,
        code: 201500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 11 },
          end: { line: 21, character: 15 },
        },
        message: '"sns" must be a SNS Message Binding',
        severity: 1,
        code: 201100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 22, character: 14 },
          end: { line: 22, character: 18 },
        },
        message: '"solace" must be a Solace Message Binding',
        severity: 1,
        code: 201200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 11 },
          end: { line: 23, character: 15 },
        },
        message: '"sqs" must be a SQS Message Binding',
        severity: 1,
        code: 201300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 24, character: 13 },
          end: { line: 24, character: 17 },
        },
        message: '"stomp" must be a STOMP Message Binding',
        severity: 1,
        code: 201400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 10 },
          end: { line: 25, character: 14 },
        },
        message: '"ws" must be a WebSockets Message Binding',
        severity: 1,
        code: 200200,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Bindings Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'message-bindings-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-bindings-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 20 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Message Bindings Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'message-bindings-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/message-bindings-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 201800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 20 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 201801,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - OAuth Flow Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'oauth-flow-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/oauth-flow-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 28 },
          end: { line: 10, character: 32 },
        },
        message: "'authorizationUrl' value must be a valid URL",
        severity: 1,
        code: 290100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 20 },
          end: { line: 11, character: 24 },
        },
        message: "'tokenUrl' value must be a valid URL",
        severity: 1,
        code: 290200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 22 },
          end: { line: 12, character: 26 },
        },
        message: "'refreshUrl' value must be a valid URL",
        severity: 1,
        code: 290300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - OAuth Flow Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'oauth-flow-fields-required-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/oauth-flow-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 8 },
          end: { line: 9, character: 16 },
        },
        message: "should always have a 'authorizationUrl'",
        severity: 1,
        code: 290101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'authorizationUrl' field",
              action: 'addChild',
              snippetYaml: 'authorizationUrl: \n  ',
              snippetJson: '"authorizationUrl": "",\n    ',
            },
          ],
        },
      },
      {
        range: {
          start: { line: 9, character: 8 },
          end: { line: 9, character: 16 },
        },
        message: "should always have a 'tokenUrl'",
        severity: 1,
        code: 290201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'tokenUrl' field",
              action: 'addChild',
              snippetYaml: 'tokenUrl: \n  ',
              snippetJson: '"tokenUrl": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - OAuth Flows Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'oauth-flows-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/oauth-flows-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 6 },
          end: { line: 8, character: 11 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - OAuth Flows Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'oauth-flows-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/oauth-flows-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 22 },
        },
        message: "'implicit' must be an object",
        severity: 1,
        code: 280100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 18 },
          end: { line: 10, character: 22 },
        },
        message: "'password' must be an object",
        severity: 1,
        code: 280200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 27 },
          end: { line: 11, character: 31 },
        },
        message: "'clientCredentials' must be an object",
        severity: 1,
        code: 280300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 27 },
          end: { line: 12, character: 31 },
        },
        message: "'authorizationCode' must be an object",
        severity: 1,
        code: 280400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Operation Trait Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'operation-trait-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-trait-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 15 },
          end: { line: 10, character: 18 },
        },
        message: "summary' value must be a string",
        severity: 1,
        code: 140200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "description' value must be a string",
        severity: 1,
        code: 140300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 6 },
          end: { line: 11, character: 10 },
        },
        message: 'tags must be an array',
        severity: 1,
        code: 140500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 20 },
          end: { line: 9, character: 23 },
        },
        message: 'externalDocs must be an object',
        severity: 1,
        code: 140600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 14 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 140700,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Operation Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'operation-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 10, character: 15 },
          end: { line: 10, character: 18 },
        },
        message: "summary' value must be a string",
        severity: 1,
        code: 130200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 19 },
          end: { line: 8, character: 22 },
        },
        message: "description' value must be a string",
        severity: 1,
        code: 130300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 6 },
          end: { line: 11, character: 10 },
        },
        message: 'tags must be an array',
        severity: 1,
        code: 130500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 20 },
          end: { line: 9, character: 23 },
        },
        message: 'externalDocs must be an object',
        severity: 1,
        code: 130600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 6 },
          end: { line: 7, character: 14 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 130700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 14 },
        },
        message: 'traits must be an array of Operation Trait Objects',
        severity: 1,
        code: 130800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 14 },
        },
        message: 'traits must be an array of Operation Trait Objects',
        severity: 1,
        code: 130801,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Operation Bindings Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'operation-bindings-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-bindings-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 11, character: 12 },
          end: { line: 11, character: 16 },
        },
        message: '"http" must be a HTTP Operation Binding',
        severity: 1,
        code: 190100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: '"amqp" must be a AMQP Operation Binding',
        severity: 1,
        code: 190500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 13 },
          end: { line: 8, character: 17 },
        },
        message: '"amqp1" must be a AMQP 1.0 Operation Binding',
        severity: 1,
        code: 190600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 18 },
          end: { line: 9, character: 22 },
        },
        message: '"anypointmq" must be a Anypoint MQ Operation Binding',
        severity: 1,
        code: 190400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 11 },
          end: { line: 13, character: 15 },
        },
        message: '"jms" must be a JMS Operation Binding',
        severity: 1,
        code: 191000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 13 },
          end: { line: 14, character: 17 },
        },
        message: '"kafka" must be a Kafka Operation Binding',
        severity: 1,
        code: 190300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 15, character: 15 },
          end: { line: 15, character: 19 },
        },
        message: '"mercure" must be a Mercure Operation Binding',
        severity: 1,
        code: 191600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 12 },
          end: { line: 16, character: 16 },
        },
        message: '"mqtt" must be a MQTT Operation Binding',
        severity: 1,
        code: 190700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 13 },
          end: { line: 17, character: 17 },
        },
        message: '"mqtt5" must be a MQTT 5 Operation Binding',
        severity: 1,
        code: 190800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 12 },
          end: { line: 18, character: 16 },
        },
        message: '"nats" must be a NATS Operation Binding',
        severity: 1,
        code: 190900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 20, character: 13 },
          end: { line: 20, character: 17 },
        },
        message: '"redis" must be a Redis Operation Binding',
        severity: 1,
        code: 191500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 11 },
          end: { line: 21, character: 15 },
        },
        message: '"sns" must be a SNS Operation Binding',
        severity: 1,
        code: 191100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 22, character: 14 },
          end: { line: 22, character: 18 },
        },
        message: '"solace" must be a Solace Operation Binding',
        severity: 1,
        code: 191200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 11 },
          end: { line: 23, character: 15 },
        },
        message: '"sqs" must be a SQS Operation Binding',
        severity: 1,
        code: 191300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 24, character: 13 },
          end: { line: 24, character: 17 },
        },
        message: '"stomp" must be a STOMP Operation Binding',
        severity: 1,
        code: 191400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 10 },
          end: { line: 25, character: 14 },
        },
        message: '"ws" must be a WebSockets Operation Binding',
        severity: 1,
        code: 190200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 13 },
          end: { line: 12, character: 17 },
        },
        message: '"ibmmq" must be a IBM MQ Operation Binding',
        severity: 1,
        code: 191800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 20 },
          end: { line: 10, character: 24 },
        },
        message: '"googlepubsub" must be a Google Cloud Pub/Sub Operation Binding',
        severity: 1,
        code: 191900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 14 },
          end: { line: 19, character: 18 },
        },
        message: '"pulsar" must be a Pulsar Operation Binding',
        severity: 1,
        code: 192000,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Operation Bindings Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'operation-bindings-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-bindings-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 4 },
          end: { line: 6, character: 22 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Operation Bindings Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'operation-bindings-ref-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/operation-bindings-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 191700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 22 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 191701,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Parameter Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'parameter-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 19 },
          end: { line: 7, character: 22 },
        },
        message: "'description' must be a string",
        severity: 1,
        code: 160100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 16 },
          end: { line: 8, character: 19 },
        },
        message: "'location' must be a string",
        severity: 1,
        code: 160300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Parameter Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'parameter-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/parameter-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 160400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 14 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 160401,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  // TODO: fix parameter object validation
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('asyncapi 3.0 - Parameters Object keys pattern and values type', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'parameters-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/parameters-3-0.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 0 },
          end: { line: 4, character: 7 },
        },
        message: 'parameters keys must match the following field pattern: ^[A-Za-z0-9_\\-]+$',
        severity: 1,
        code: 50001,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 4, character: 0 },
          end: { line: 4, character: 7 },
        },
        message: 'Parameters Object values must be of Parameter Object shape',
        severity: 1,
        code: 50002,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 14 },
          end: { line: 6, character: 17 },
        },
        message: "'protocol' must be a string",
        severity: 1,
        code: 100200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 21 },
          end: { line: 9, character: 24 },
        },
        message: "'protocolVersion' must be a string",
        severity: 1,
        code: 100300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 8, character: 17 },
          end: { line: 8, character: 20 },
        },
        message: "'description' must be a string",
        severity: 1,
        code: 100400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 15 },
          end: { line: 11, character: 18 },
        },
        message: 'variables must be an object',
        severity: 1,
        code: 100600,
        source: 'apilint',
        data: {},
      },
      // TODO: adjust once server variable type validation is fixed
      {
        range: {
          start: { line: 11, character: 4 },
          end: { line: 11, character: 13 },
        },
        message: "variables' values must be of Server Variable Object shape",
        severity: 1,
        code: 100601,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 5, character: 2 },
          end: { line: 5, character: 9 },
        },
        message: 'tags must be an array of Tags',
        severity: 1,
        code: 100900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 14 },
          end: { line: 7, character: 17 },
        },
        message: 'bindings must be an object',
        severity: 1,
        code: 1007000,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Object required fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'server-fields-required-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-fields-required-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 5, character: 2 },
          end: { line: 5, character: 9 },
        },
        message: "should always have a 'protocol'",
        severity: 1,
        code: 100201,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'protocol'",
              action: 'addChild',
              snippetYaml: 'protocol: \n    ',
              snippetJson: '"protocol": "",\n      ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/server-ref-3-0.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 6, character: 10 },
          end: { line: 6, character: 14 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 100800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 7, character: 2 },
          end: { line: 7, character: 9 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 100801,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Bindings Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'server-bindings-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-bindings-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 13, character: 12 },
          end: { line: 13, character: 16 },
        },
        message: '"http" must be a HTTP Server Binding',
        severity: 1,
        code: 170100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 9, character: 12 },
          end: { line: 9, character: 16 },
        },
        message: '"amqp" must be a AMQP Server Binding',
        severity: 1,
        code: 170500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 13 },
          end: { line: 10, character: 17 },
        },
        message: '"amqp1" must be a AMQP 1.0 Server Binding',
        severity: 1,
        code: 170600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 18 },
          end: { line: 11, character: 22 },
        },
        message: '"anypointmq" must be a Anypoint MQ Server Binding',
        severity: 1,
        code: 170400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 13 },
          end: { line: 14, character: 17 },
        },
        message: '"ibmmq" must be a IBM MQ Server Binding',
        severity: 1,
        code: 171700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 15, character: 11 },
          end: { line: 15, character: 15 },
        },
        message: '"jms" must be a JMS Server Binding',
        severity: 1,
        code: 171000,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 16, character: 13 },
          end: { line: 16, character: 17 },
        },
        message: '"kafka" must be a Kafka Server Binding',
        severity: 1,
        code: 170300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 17, character: 15 },
          end: { line: 17, character: 19 },
        },
        message: '"mercure" must be a Mercure Server Binding',
        severity: 1,
        code: 171600,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 18, character: 12 },
          end: { line: 18, character: 16 },
        },
        message: '"mqtt" must be a MQTT Server Binding',
        severity: 1,
        code: 170700,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 13 },
          end: { line: 19, character: 17 },
        },
        message: '"mqtt5" must be a MQTT 5 Server Binding',
        severity: 1,
        code: 170800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 20, character: 12 },
          end: { line: 20, character: 16 },
        },
        message: '"nats" must be a NATS Server Binding',
        severity: 1,
        code: 170900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 22, character: 13 },
          end: { line: 22, character: 17 },
        },
        message: '"redis" must be a Redis Server Binding',
        severity: 1,
        code: 171500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 11 },
          end: { line: 23, character: 15 },
        },
        message: '"sns" must be a SNS Server Binding',
        severity: 1,
        code: 171100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 24, character: 14 },
          end: { line: 24, character: 18 },
        },
        message: '"solace" must be a Solace Server Binding',
        severity: 1,
        code: 171200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 11 },
          end: { line: 25, character: 15 },
        },
        message: '"sqs" must be a SQS Server Binding',
        severity: 1,
        code: 171300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 26, character: 13 },
          end: { line: 26, character: 17 },
        },
        message: '"stomp" must be a STOMP Server Binding',
        severity: 1,
        code: 171400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 27, character: 10 },
          end: { line: 27, character: 14 },
        },
        message: '"ws" must be a WebSockets Server Binding',
        severity: 1,
        code: 170200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 12, character: 20 },
          end: { line: 12, character: 24 },
        },
        message: '"googlepubsub" must be a IBM MQ Server Binding',
        severity: 1,
        code: 171900,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 21, character: 14 },
          end: { line: 21, character: 18 },
        },
        message: '"pulsar" must be a Pulsar Server Binding',
        severity: 1,
        code: 172000,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Bindings Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'server-bindings-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-bindings-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 8, character: 4 },
          end: { line: 8, character: 12 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Bindings Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-bindings-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-bindings-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 12 },
          end: { line: 9, character: 16 },
        },
        message: "'$ref' value must be a valid URI-reference",
        severity: 1,
        code: 171800,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 4 },
          end: { line: 13, character: 12 },
        },
        message: 'All other properties in a "$ref" object are ignored',
        severity: 2,
        code: 171801,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Variable Object allowed fields', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'server-variable-allowed-fields-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variable-allowed-fields-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 9, character: 6 },
          end: { line: 9, character: 10 },
        },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Server Variable Object fields type', async function () {
    const spec = fs
      .readFileSync(
        path.join(
          __dirname,
          'fixtures',
          'validation',
          'asyncapi',
          'server-variable-fields-types-3-0.yaml',
        ),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variable-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 12, character: 14 },
          end: { line: 12, character: 17 },
        },
        message: "enum' value must be an array of strings",
        severity: 1,
        code: 110100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 10, character: 17 },
          end: { line: 10, character: 20 },
        },
        message: "'default' must be a string",
        severity: 1,
        code: 110200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 11, character: 21 },
          end: { line: 11, character: 24 },
        },
        message: "'description' must be a string",
        severity: 1,
        code: 110300,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 13, character: 18 },
          end: { line: 13, character: 21 },
        },
        message: "examples' value must be an array of strings",
        severity: 1,
        code: 110400,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  // TODO: fix server variable type validation in Server Object
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('asyncapi 3.0 - Server Variable Object reference rules', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'server-variable-ref-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/server-variable-ref-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Servers Object keys pattern and values type', async function () {
    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'servers-3-0.yaml'))
      .toString();
    const doc: TextDocument = TextDocument.create('foo://bar/servers-3-0.yaml', 'yaml', 0, spec);

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 0 },
          end: { line: 4, character: 7 },
        },
        message: 'servers keys must match the following field pattern: ^[A-Za-z0-9_\\-]+$',
        severity: 1,
        code: 50001,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 4, character: 0 },
          end: { line: 4, character: 7 },
        },
        message: 'Servers Object values must be of Server Object shape',
        severity: 1,
        code: 50002,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Tag Object fields types', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'tag-fields-types-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/tag-fields-types-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 7, character: 12 },
          end: { line: 7, character: 15 },
        },
        message: "'name' value must be a string",
        severity: 1,
        code: 240100,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 5, character: 19 },
          end: { line: 5, character: 22 },
        },
        message: "'description' value must be a string",
        severity: 1,
        code: 240200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 6, character: 20 },
          end: { line: 6, character: 23 },
        },
        message: 'externalDocs must be an object',
        severity: 1,
        code: 240300,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });

  it('asyncapi 3.0 - Tags Object items type', async function () {
    const spec = fs
      .readFileSync(
        path.join(__dirname, 'fixtures', 'validation', 'asyncapi', 'tags-items-type-3-0.yaml'),
      )
      .toString();
    const doc: TextDocument = TextDocument.create(
      'foo://bar/tags-items-type-3-0.yaml',
      'yaml',
      0,
      spec,
    );

    const languageService: LanguageService = getLanguageService(contextNoSchema);

    const result = await languageService.doValidation(doc);
    const expected: Diagnostic[] = [
      {
        range: {
          start: { line: 4, character: 2 },
          end: { line: 4, character: 6 },
        },
        message: 'Tags Object items must be of Tag Object shape',
        severity: 1,
        code: 60001,
        source: 'apilint',
        data: {},
      },
    ];
    assert.deepEqual(result, expected);

    languageService.terminate();
  });
});
