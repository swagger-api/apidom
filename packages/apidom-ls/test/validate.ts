import fs from 'fs';
import path from 'path';
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
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';
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

describe('apidom-ls-validate', function () {
  const oasJsonSchemavalidationProvider = new OpenAPi31JsonSchemaValidationProvider();
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();
  const oasJsonSchemavalidationProvider30 = new OpenAPi31JsonSchemaValidationProvider(
    openapiSchemaJson30,
    false,
  );

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [oasJsonSchemavalidationProvider, asyncJsonSchemavalidationProvider],
  };

  const context30: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [oasJsonSchemavalidationProvider30, asyncJsonSchemavalidationProvider],
  };

  it('test validation for asyncapi and openapi', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/file.json',
      'json',
      0,
      specOpenapiSimple,
    );
    const docAsyncapi: TextDocument = TextDocument.create(
      'foo://bar/file.json',
      'json',
      0,
      specAsync,
    );

    const docAsyncapiYaml: TextDocument = TextDocument.create(
      'foo://bar/file.yaml',
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
        code: 3,
        source: 'apilint',
        data: {
          quickFix: {
            message: "add 'description' field",
            action: 'addChild',
            snippetYaml: 'description: \n  ',
            snippetJson: '"description": "",\n    ',
          },
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    result = await languageService.doValidation(docAsyncapi, validationContext);
    assert.deepEqual(result, [
      {
        range: {
          start: {
            line: 1,
            character: 2,
          },
          end: {
            line: 1,
            character: 12,
          },
        },
        message: "'asyncapi' value must be 2.0.0",
        severity: 1,
        code: 0,
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
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
      },
      {
        range: {
          start: {
            line: 54,
            character: 10,
          },
          end: {
            line: 54,
            character: 18,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
      },
    ]);
    result = await languageService.doValidation(docAsyncapiYaml, validationContext);
    assert.deepEqual(result, [
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 8,
          },
        },
        message: "'asyncapi' value must be 2.0.0",
        severity: 1,
        code: 0,
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
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
      },
      {
        range: {
          start: {
            line: 44,
            character: 8,
          },
          end: {
            line: 44,
            character: 14,
          },
        },
        message:
          'should be equal to one or more of the allowed values: array, null, boolean, integer, number, object, string',
        severity: 1,
        code: 0,
      },
    ] as Diagnostic[]);
  });

  it('test validation for openapi with modified 3.0 schema', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/file.json',
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
        code: 3,
        source: 'apilint',
        data: {
          quickFix: {
            message: "add 'description' field",
            action: 'addChild',
            snippetYaml: 'description: \n  ',
            snippetJson: '"description": "",\n    ',
          },
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });
});
