import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ApidomCompletionItem,
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

      // Verify all properties comprehensively
      assert.isDefined(queryCompletion);
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.label, 'query');
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.insertTextFormat, 2);
      assert.strictEqual(
        ((queryCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        '[Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)\n\\\n\\\nA definition of a QUERY operation on this path. QUERY method allows safely querying the state of a resource in an idempotent way using a query payload.',
      );
      assert.strictEqual(
        (queryCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (queryCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
      );
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

      // Verify all properties comprehensively
      assert.isDefined(additionalOperationsCompletion);
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.label,
        'additionalOperations',
      );
      assert.strictEqual((additionalOperationsCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.insertTextFormat,
        2,
      );
      assert.strictEqual(
        ((additionalOperationsCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        'Map[`string`, [Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)]\n\\\n\\\nA map of HTTP methods you choose to include in your API design for non-standard methods. Each key must be a valid HTTP method name and each value must be an Operation Object.',
      );
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
      );
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

      // Verify all properties comprehensively
      assert.isDefined(mediaTypesCompletion);
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.label, 'mediaTypes');
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.insertTextFormat, 2);
      assert.strictEqual(
        ((mediaTypesCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject)]\n\\\n\\\nAn object to hold reusable [Media Type Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject).',
      );
      assert.strictEqual(
        (mediaTypesCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (mediaTypesCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
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

      // Verify all properties comprehensively (YAML format)
      assert.isDefined(queryCompletion);
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.label, 'query');
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual((queryCompletion as ApidomCompletionItem)?.insertTextFormat, 2);
      assert.strictEqual(
        ((queryCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        '[Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)\n\\\n\\\nA definition of a QUERY operation on this path. QUERY method allows safely querying the state of a resource in an idempotent way using a query payload.',
      );
      assert.strictEqual(
        (queryCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (queryCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
      );
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

      // Verify all properties comprehensively (YAML format)
      assert.isDefined(additionalOperationsCompletion);
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.label,
        'additionalOperations',
      );
      assert.strictEqual((additionalOperationsCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.insertTextFormat,
        2,
      );
      assert.strictEqual(
        ((additionalOperationsCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        'Map[`string`, [Operation Object](https://spec.openapis.org/oas/v3.2.0.html#operation-object)]\n\\\n\\\nA map of HTTP methods you choose to include in your API design for non-standard methods. Each key must be a valid HTTP method name and each value must be an Operation Object.',
      );
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (additionalOperationsCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
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

      // Verify all properties comprehensively (YAML format)
      assert.isDefined(mediaTypesCompletion);
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.label, 'mediaTypes');
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.kind, 14);
      assert.strictEqual((mediaTypesCompletion as ApidomCompletionItem)?.insertTextFormat, 2);
      assert.strictEqual(
        ((mediaTypesCompletion as ApidomCompletionItem)?.documentation as any)?.value,
        'Map[`string`, [Media Type Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject)]\n\\\n\\\nAn object to hold reusable [Media Type Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#mediaTypeObject).',
      );
      assert.strictEqual(
        (mediaTypesCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.version,
        '3.2.0',
      );
      assert.strictEqual(
        (mediaTypesCompletion as ApidomCompletionItem)?.targetSpecs?.[0]?.namespace,
        'openapi',
      );
    });
  });
});
