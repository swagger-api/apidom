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
import openapiSchemaJson30 from '../src/services/validation/json-schema/open-api-30/openapi-schema-idea-draft7.json';
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
        message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
            message: 'type must be one of allowed values',
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
});
