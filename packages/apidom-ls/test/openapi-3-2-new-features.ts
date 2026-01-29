import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { OpenAPi32JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-32-json-schema-validation-provider.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specOpenapi32ValidNewFeatures = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-2-new-features-valid.json'))
  .toString();

const specOpenapi32InvalidNewFeatures = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'openapi-3-2-new-features-invalid.json'))
  .toString();

describe('OpenAPI 3.2.0 New Features', function () {
  const oasJsonSchemavalidationProvider32 = new OpenAPi32JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [oasJsonSchemavalidationProvider32],
    performanceLogs: logPerformance,
    logLevel,
  };

  let languageService: LanguageService;

  beforeEach(function () {
    languageService = getLanguageService(context);
  });

  describe('QUERY Operation', function () {
    it('should validate valid query operation', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-query-valid.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Filter for query-related errors
      const queryErrors = result.filter(
        (d) => d.message.includes('query') && d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        queryErrors.length,
        0,
        `Expected no errors for valid query operation, but got: ${JSON.stringify(queryErrors, null, 2)}`,
      );
    });

    it('should report error when query is not an Operation Object', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-query-invalid.json',
        'json',
        0,
        specOpenapi32InvalidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for query type error
      const queryTypeErrors = result.filter(
        (d) =>
          d.message.includes('query') &&
          d.message.includes('Operation Object') &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(
        queryTypeErrors.length,
        1,
        'Expected error for invalid query operation type',
      );
    });
  });

  describe('additionalOperations Field', function () {
    it('should validate valid additionalOperations', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-additional-operations-valid.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Filter for additionalOperations-related errors
      const additionalOpsErrors = result.filter(
        (d) =>
          d.message.includes('additionalOperations') && d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        additionalOpsErrors.length,
        0,
        `Expected no errors for valid additionalOperations, but got: ${JSON.stringify(additionalOpsErrors, null, 2)}`,
      );
    });

    it('should report error when additionalOperations is not an object', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-additional-operations-invalid.json',
        'json',
        0,
        specOpenapi32InvalidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for additionalOperations type error
      const additionalOpsTypeErrors = result.filter(
        (d) =>
          d.message.includes('additionalOperations') &&
          d.message.includes('object') &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(
        additionalOpsTypeErrors.length,
        1,
        'Expected error for invalid additionalOperations type',
      );
    });

    it('should report error when additionalOperations values are not Operation Objects', async function () {
      const invalidSpec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "additionalOperations": {
        "CUSTOM": "not-an-operation"
      }
    }
  }
}`;

      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-additional-operations-values-invalid.json',
        'json',
        0,
        invalidSpec,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for additionalOperations values error
      const additionalOpsValuesErrors = result.filter(
        (d) =>
          (d.message.includes('additionalOperations') || d.message.includes('Operation')) &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(
        additionalOpsValuesErrors.length,
        1,
        'Expected error for invalid additionalOperations values',
      );
    });
  });

  describe('querystring Parameter Location', function () {
    it('should validate valid querystring parameter location', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-querystring-valid.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Filter for querystring parameter errors
      const querystringErrors = result.filter(
        (d) => d.message.includes('querystring') && d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        querystringErrors.length,
        0,
        `Expected no errors for valid querystring parameter, but got: ${JSON.stringify(querystringErrors, null, 2)}`,
      );
    });

    it('should report error for invalid parameter location', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-parameter-location-invalid.json',
        'json',
        0,
        specOpenapi32InvalidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for invalid location error
      const locationErrors = result.filter(
        (d) =>
          d.message.includes("'in'") &&
          (d.message.includes('allowed values') || d.message.includes('location')) &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(locationErrors.length, 1, 'Expected error for invalid parameter location');
    });

    it('should accept all valid parameter locations including querystring', async function () {
      const validLocationsSpec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Parameter Locations Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "get": {
        "summary": "Test all parameter locations",
        "operationId": "testParams",
        "parameters": [
          {
            "name": "pathParam",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          },
          {
            "name": "queryParam",
            "in": "query",
            "schema": { "type": "string" }
          },
          {
            "name": "headerParam",
            "in": "header",
            "schema": { "type": "string" }
          },
          {
            "name": "cookieParam",
            "in": "cookie",
            "schema": { "type": "string" }
          },
          {
            "name": "querystringParam",
            "in": "querystring",
            "schema": {
              "type": "object",
              "properties": {
                "filter": { "type": "string" }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  }
}`;

      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-all-parameter-locations.json',
        'json',
        0,
        validLocationsSpec,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Filter for parameter location errors
      const locationErrors = result.filter(
        (d) =>
          d.message.includes("'in'") &&
          d.message.includes('allowed values') &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        locationErrors.length,
        0,
        `Expected no errors for valid parameter locations, but got: ${JSON.stringify(locationErrors, null, 2)}`,
      );
    });
  });

  describe('mediaTypes in Components', function () {
    it('should validate valid mediaTypes in components', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-components-mediatypes-valid.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Filter for mediaTypes-related errors
      const mediaTypesErrors = result.filter(
        (d) => d.message.includes('mediaTypes') && d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        mediaTypesErrors.length,
        0,
        `Expected no errors for valid mediaTypes, but got: ${JSON.stringify(mediaTypesErrors, null, 2)}`,
      );
    });

    it('should report error when mediaTypes is not an object', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-components-mediatypes-invalid.json',
        'json',
        0,
        specOpenapi32InvalidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for mediaTypes type error
      const mediaTypesTypeErrors = result.filter(
        (d) => d.message.includes('mediaTypes') && d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(
        mediaTypesTypeErrors.length,
        1,
        'Expected error for invalid mediaTypes type',
      );
    });
  });

  describe('PathItem Allowed Fields for 3.2.0', function () {
    it('should not report error for query and additionalOperations fields in 3.2.0', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-pathitem-fields-valid.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for "not allowed fields" errors
      const notAllowedErrors = result.filter(
        (d) =>
          d.message.includes('not allowed fields') &&
          (d.message.includes('query') || d.message.includes('additionalOperations')) &&
          d.severity === DiagnosticSeverity.Error,
      );

      assert.strictEqual(
        notAllowedErrors.length,
        0,
        `Expected no "not allowed fields" errors for query and additionalOperations in 3.2.0, but got: ${JSON.stringify(notAllowedErrors, null, 2)}`,
      );
    });

    it('should report error for invalid fields in PathItem', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-pathitem-invalid-fields.json',
        'json',
        0,
        specOpenapi32InvalidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // Check for "not allowed fields" errors
      const notAllowedErrors = result.filter(
        (d) => d.message.includes('not allowed fields') && d.severity === DiagnosticSeverity.Error,
      );

      assert.isAtLeast(notAllowedErrors.length, 1, 'Expected error for invalid fields in PathItem');
    });
  });

  describe('Integration Test - All New Features Together', function () {
    it('should validate spec with all new 3.2.0 features correctly', async function () {
      const doc = TextDocument.create(
        'foo://bar/openapi-3-2-all-features.json',
        'json',
        0,
        specOpenapi32ValidNewFeatures,
      );

      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
      };

      const result = await languageService.doValidation(doc, validationContext);

      // We expect some warnings/info but no critical errors for valid spec
      const criticalErrors = result.filter((d) => d.severity === DiagnosticSeverity.Error);

      // Allow for possible schema validation nuances but ensure new features don't cause errors
      const newFeatureErrors = criticalErrors.filter(
        (d) =>
          d.message.includes('query') ||
          d.message.includes('additionalOperations') ||
          d.message.includes('querystring') ||
          (d.message.includes('mediaTypes') && d.message.includes('not allowed')),
      );

      assert.strictEqual(
        newFeatureErrors.length,
        0,
        `Expected no errors for new 3.2.0 features, but got: ${JSON.stringify(newFeatureErrors, null, 2)}`,
      );
    });
  });
});
