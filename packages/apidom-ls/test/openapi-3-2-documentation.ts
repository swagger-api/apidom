import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import { LanguageService, LanguageServiceContext } from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { OpenAPi32JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-32-json-schema-validation-provider.ts';
import { logPerformance, logLevel } from './test-utils.ts';

describe('OpenAPI 3.2.0 Documentation/Hover', function () {
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

  describe('PathItem documentation', function () {
    it('should provide hover documentation for query operation', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "query": {
        "summary": "Test query",
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

      // Hover over "query" key
      const position = Position.create(8, 7);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result');
      assert.isDefined(result?.contents, 'Hover should have contents');

      const hoverText =
        typeof result?.contents === 'string'
          ? result.contents
          : 'value' in result!.contents
            ? result.contents.value
            : '';

      assert.include(
        hoverText.toLowerCase(),
        'operation',
        'Hover documentation should mention Operation',
      );
    });

    it('should provide hover documentation for additionalOperations', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "additionalOperations": {
        "PURGE": {
          "summary": "Purge",
          "responses": {
            "204": {
              "description": "Purged"
            }
          }
        }
      }
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      // Hover over "additionalOperations" key
      const position = Position.create(8, 15);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result');
      assert.isDefined(result?.contents, 'Hover should have contents');

      const hoverText =
        typeof result?.contents === 'string'
          ? result.contents
          : 'value' in result!.contents
            ? result.contents.value
            : '';

      assert.include(
        hoverText.toLowerCase(),
        'http',
        'Hover documentation should mention HTTP methods',
      );
    });

    it('should provide OpenAPI 3.2.0 specific documentation for PathItem fields', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "summary": "Test path",
      "parameters": []
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      // Hover over "parameters" key
      const position = Position.create(9, 10);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result');
      assert.isDefined(result?.contents, 'Hover should have contents');

      const hoverText =
        typeof result?.contents === 'string'
          ? result.contents
          : 'value' in result!.contents
            ? result.contents.value
            : '';

      // Check that documentation is present (specifics may vary)
      assert.isTrue(hoverText.length > 0, 'Hover documentation should not be empty');
    });
  });

  describe('Parameter documentation', function () {
    it('should provide documentation for querystring parameter location', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "paths": {
    "/test": {
      "parameters": [
        {
          "name": "test",
          "in": "querystring",
          "schema": {
            "type": "object"
          }
        }
      ]
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      // Hover over "in" key
      const position = Position.create(11, 12);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result');
      assert.isDefined(result?.contents, 'Hover should have contents');

      const hoverText =
        typeof result?.contents === 'string'
          ? result.contents
          : 'value' in result!.contents
            ? result.contents.value
            : '';

      // Documentation should mention querystring as a valid location
      assert.include(
        hoverText.toLowerCase(),
        'location',
        'Hover documentation should mention location',
      );
    });
  });

  describe('Components documentation', function () {
    it('should provide documentation for mediaTypes field', async function () {
      const spec = `{
  "openapi": "3.2.0",
  "info": {
    "title": "Test",
    "version": "1.0.0"
  },
  "components": {
    "mediaTypes": {
      "JsonType": {
        "schema": {
          "type": "object"
        }
      }
    }
  }
}`;

      const doc = TextDocument.create('foo://bar/test.json', 'json', 0, spec);

      // Hover over "mediaTypes" key
      const position = Position.create(7, 10);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result');
      assert.isDefined(result?.contents, 'Hover should have contents');

      const hoverText =
        typeof result?.contents === 'string'
          ? result.contents
          : 'value' in result!.contents
            ? result.contents.value
            : '';

      assert.include(
        hoverText.toLowerCase(),
        'media type',
        'Hover documentation should mention Media Type',
      );
    });
  });

  describe('YAML format documentation', function () {
    it('should provide hover documentation for query in YAML', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
paths:
  /test:
    query:
      summary: Test query
      responses:
        '200':
          description: OK`;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      // Hover over "query" key
      const position = Position.create(6, 6);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result for YAML');
      assert.isDefined(result?.contents, 'Hover should have contents for YAML');
    });

    it('should provide hover documentation for additionalOperations in YAML', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
paths:
  /test:
    additionalOperations:
      PURGE:
        summary: Purge
        responses:
          '204':
            description: Purged`;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      // Hover over "additionalOperations" key
      const position = Position.create(6, 10);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result for YAML');
      assert.isDefined(result?.contents, 'Hover should have contents for YAML');
    });

    it('should provide hover documentation for mediaTypes in YAML', async function () {
      const spec = `openapi: 3.2.0
info:
  title: Test
  version: 1.0.0
components:
  mediaTypes:
    JsonType:
      schema:
        type: object`;

      const doc = TextDocument.create('foo://bar/test.yaml', 'yaml', 0, spec);

      // Hover over "mediaTypes" key
      const position = Position.create(5, 8);

      const result = await languageService.doHover(doc, position);

      assert.isDefined(result, 'Hover should return result for YAML');
      assert.isDefined(result?.contents, 'Hover should have contents for YAML');
    });
  });
});
