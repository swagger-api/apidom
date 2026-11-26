import { assert } from 'chai';
import { OpenApi3_0Element } from '@swagger-api/apidom-ns-openapi-3-0';

import findSchemaPositions from '../../../src/strategies/json-schema-2020-12-to-openapi-3-0/schema-positions.ts';

const ok = { description: 'ok', content: { 'application/json': { schema: { type: 'string' } } } };

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('schema positions', function () {
        specify('should find outermost schemas only', function () {
          const api = OpenApi3_0Element.refract({
            openapi: '3.0.3',
            paths: { '/a': { get: { responses: { '200': ok } } } },
            components: {
              schemas: { A: { properties: { b: { type: 'string' } } }, B: { $ref: '#/x' } },
            },
          });

          assert.deepEqual(findSchemaPositions(api), [
            ['paths', '/a', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
            ['components', 'schemas', 'A'],
            ['components', 'schemas', 'B'],
          ]);
        });

        specify('should not mistake keys containing "/" for nesting', function () {
          const nested = '/a/get/responses/200/content/application/json/schema/x';
          const api = OpenApi3_0Element.refract({
            openapi: '3.0.3',
            paths: {
              '/a': { get: { responses: { '200': ok } } },
              [nested]: { get: { responses: { '200': ok } } },
            },
          });

          assert.deepEqual(findSchemaPositions(api), [
            ['paths', '/a', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
            ['paths', nested, 'get', 'responses', '200', 'content', 'application/json', 'schema'],
          ]);
        });
      });
    });
  });
});
