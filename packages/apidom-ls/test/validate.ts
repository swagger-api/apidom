import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, CodeAction } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';
import { Asyncapi21JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-21-json-schema-validation-provider';
import { Asyncapi22JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-22-json-schema-validation-provider';
import openapiSchemaJson30 from '../src/services/validation/json-schema/open-api-30/openapi-schema-idea-draft7.json';

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
  };

  const context30: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [
      oasJsonSchemavalidationProvider30,
      asyncJsonSchemavalidationProvider,
      async21JsonSchemavalidationProvider,
      async22JsonSchemavalidationProvider,
    ],
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
            },
          ],
        },
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
        message: "exclusiveMaximum' value must be a number",
        severity: 1,
        code: 10016,
        source: 'apilint',
        data: {},
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
        code: 10077,
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
        code: 10077,
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
            },
          ],
        },
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
        message: "exclusiveMaximum' value must be a number",
        severity: 1,
        code: 10016,
        source: 'apilint',
        data: {},
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
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
        code: 10077,
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
        code: 10077,
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

    const languageService: LanguageService = getLanguageService(context);

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

    const languageService: LanguageService = getLanguageService(context);

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
            character: 0,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 10070,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  $1\n',
              snippetJson: '"channels": {\n  $1\n},\n',
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
        code: 10077,
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
                character: 0,
              },
            },
            message: "should always have a 'channels' section",
            severity: 1,
            code: 10070,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'channels' section",
                  action: 'addChild',
                  snippetYaml: 'channels: \n  $1\n',
                  snippetJson: '"channels": {\n  $1\n},\n',
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
                newText: 'channels: \n  $1\n',
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
            code: 10077,
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

    const languageService: LanguageService = getLanguageService(context);

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
            character: 0,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 10070,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  $1\n',
              snippetJson: '"channels": {\n  $1\n},\n',
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
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
                character: 0,
              },
            },
            message: "should always have a 'channels' section",
            severity: 1,
            code: 10070,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'channels' section",
                  action: 'addChild',
                  snippetYaml: 'channels: \n  $1\n',
                  snippetJson: '"channels": {\n  $1\n},\n',
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
                newText: 'channels: \n  $1\n',
              },
            ],
          },
        },
      },
      {
        title: "add 'description' field",
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
            message: "should always have a 'description'",
            severity: 1,
            code: 10076,
            source: 'apilint',
            data: {
              quickFix: [
                {
                  message: "add 'description' field",
                  action: 'addChild',
                  snippetYaml: 'description: \n  ',
                  snippetJson: '"description": "",\n    ',
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
                    line: 2,
                    character: 2,
                  },
                  end: {
                    line: 2,
                    character: 2,
                  },
                },
                newText: 'description: \n  ',
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

    const languageService: LanguageService = getLanguageService(context);

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
            character: 0,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 10070,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  $1\n',
              snippetJson: '"channels": {\n  $1\n},\n',
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
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
        message: 'additionalItems must be a schema',
        severity: 1,
        code: 10020,
        source: 'apilint',
        data: {},
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

    const languageService: LanguageService = getLanguageService(context);

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
            character: 0,
          },
        },
        message: "should always have a 'channels' section",
        severity: 1,
        code: 10070,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'channels' section",
              action: 'addChild',
              snippetYaml: 'channels: \n  $1\n',
              snippetJson: '"channels": {\n  $1\n},\n',
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
        message: "should always have a 'description'",
        severity: 1,
        code: 10076,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'description' field",
              action: 'addChild',
              snippetYaml: 'description: \n  ',
              snippetJson: '"description": "",\n    ',
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
});
