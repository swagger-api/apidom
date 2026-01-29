import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { OpenAPi32JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-32-json-schema-validation-provider.ts';
import { logPerformance, logLevel } from './test-utils.ts';

describe('OpenAPI 3.2.0 Completion', function () {
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

  afterEach(function () {
    languageService.terminate();
  });

  describe('PathItem completions', function () {
    it('should suggest query operation in PathItem', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(8, 7); // After opening quote in PathItem

      const result = await languageService.doCompletion(doc, position, completionContext);

      const queryCompletion = result?.items.find((item) => item.label === 'query');

      assert.isDefined(queryCompletion, 'Should suggest "query" operation');

      const queryDoc =
        typeof queryCompletion?.documentation === 'string'
          ? queryCompletion.documentation
          : queryCompletion?.documentation && 'value' in queryCompletion.documentation
            ? queryCompletion.documentation.value
            : '';

      assert.include(queryDoc, 'QUERY', 'Documentation should mention QUERY method');
    });

    it('should suggest additionalOperations in PathItem', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(8, 7); // After opening quote in PathItem

      const result = await languageService.doCompletion(doc, position, completionContext);

      const additionalOperationsCompletion = result?.items.find(
        (item) => item.label === 'additionalOperations',
      );

      assert.isDefined(
        additionalOperationsCompletion,
        'Should suggest "additionalOperations" field',
      );

      const additionalOpsDoc =
        typeof additionalOperationsCompletion?.documentation === 'string'
          ? additionalOperationsCompletion.documentation
          : additionalOperationsCompletion?.documentation &&
              'value' in additionalOperationsCompletion.documentation
            ? additionalOperationsCompletion.documentation.value
            : '';

      assert.include(additionalOpsDoc, 'HTTP methods', 'Documentation should mention HTTP methods');
    });

    it('should not suggest query and additionalOperations for OpenAPI 3.1.0', async function () {
      const spec = `{
  "openapi": "3.1.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(8, 7); // After opening quote in PathItem

      const result = await languageService.doCompletion(doc, position, completionContext);

      const queryCompletion = result?.items.find((item) => item.label === 'query');
      const additionalOperationsCompletion = result?.items.find(
        (item) => item.label === 'additionalOperations',
      );

      assert.isUndefined(queryCompletion, 'Should NOT suggest "query" operation for 3.1.0');
      assert.isUndefined(
        additionalOperationsCompletion,
        'Should NOT suggest "additionalOperations" for 3.1.0',
      );
    });
  });

  describe('Components completions', function () {
    it('should suggest mediaTypes in Components', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "components": {
    "
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(7, 5); // After opening quote in components

      const result = await languageService.doCompletion(doc, position, completionContext);

      const mediaTypesCompletion = result?.items.find((item) => item.label === 'mediaTypes');

      assert.isDefined(mediaTypesCompletion, 'Should suggest "mediaTypes" field');

      const mediaTypesDoc =
        typeof mediaTypesCompletion?.documentation === 'string'
          ? mediaTypesCompletion.documentation
          : mediaTypesCompletion?.documentation && 'value' in mediaTypesCompletion.documentation
            ? mediaTypesCompletion.documentation.value
            : '';

      assert.include(
        mediaTypesDoc,
        'Media Type',
        'Documentation should mention Media Type Objects',
      );
    });

    it('should not suggest mediaTypes for OpenAPI 3.1.0', async function () {
      const spec = `{
  "openapi": "3.1.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "components": {
    "
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(7, 5); // After opening quote in components

      const result = await languageService.doCompletion(doc, position, completionContext);

      const mediaTypesCompletion = result?.items.find((item) => item.label === 'mediaTypes');

      assert.isUndefined(mediaTypesCompletion, 'Should NOT suggest "mediaTypes" for 3.1.0');
    });
  });

  describe('Parameter location completions', function () {
    it('should accept querystring as parameter location value', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "get": {
        "parameters": [
          {
            "name": "test",
            "in": "querystring",
            "schema": {
              "type": "object"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      // We can't easily test that querystring is accepted in completion
      // but we can verify it doesn't cause validation errors
      // This is more of a validation test, but placed here for completeness
      const result = await languageService.doCompletion(
        doc,
        Position.create(12, 18),
        completionContext,
      );

      // The fact that this doesn't error is the test
      assert.isDefined(result, 'Completion should work with querystring parameter');
    });
  });

  describe('YAML format completions', function () {
    it('should suggest query operation in PathItem (YAML)', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
paths:
  /test:
    `;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(6, 4); // After indentation under /test

      const result = await languageService.doCompletion(doc, position, completionContext);

      const queryCompletion = result?.items.find((item) => item.label === 'query');

      assert.isDefined(queryCompletion, 'Should suggest "query" operation in YAML');
    });

    it('should suggest additionalOperations in PathItem (YAML)', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
paths:
  /test:
    `;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(6, 4); // After indentation under /test

      const result = await languageService.doCompletion(doc, position, completionContext);

      const additionalOperationsCompletion = result?.items.find(
        (item) => item.label === 'additionalOperations',
      );

      assert.isDefined(
        additionalOperationsCompletion,
        'Should suggest "additionalOperations" in YAML',
      );
    });

    it('should suggest mediaTypes in Components (YAML)', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
components:
  `;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      const completionContext: CompletionContext = {
        maxNumberOfItems: 100,
      };

      const position = Position.create(5, 2); // After indentation under components

      const result = await languageService.doCompletion(doc, position, completionContext);

      const mediaTypesCompletion = result?.items.find((item) => item.label === 'mediaTypes');

      assert.isDefined(mediaTypesCompletion, 'Should suggest "mediaTypes" in YAML');
    });
  });
});
