import { assert } from 'chai';
import { ObjectElement, find, toValue, isElement } from '@swagger-api/apidom-core';
import { parse } from '@swagger-api/apidom-parser-adapter-json';

import {
  isSchemaElement,
  JsonSchemaDialectElement,
  OpenApi3_1Element,
  SchemaElement,
} from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SchemaElement', function () {
      context('$schema keyword in embedded resources', function () {
        context('given Schema Object without $schema keyword', function () {
          specify('should annotate Schema Object with default dialect', function () {
            const genericObjectElement = new ObjectElement({
              openapi: '3.1.0',
              components: {
                schemas: {
                  user: {
                    $id: '1',
                    type: 'object',
                  },
                },
              },
            });
            const openApiElement = OpenApi3_1Element.refract(genericObjectElement);
            const schemaElement = find((e) => isSchemaElement(e), openApiElement);
            const actual = toValue(schemaElement?.meta.get('inherited$schema'));
            const expected = toValue(JsonSchemaDialectElement.default);

            assert.strictEqual(actual, expected);
          });
        });

        context(
          'given direct refracting to Schema Element from generic Object Element',
          function () {
            context('given no jsonSchemaDialect field', function () {
              specify('should annotate Schema Object with default dialect', function () {
                const genericObjectElement = { type: 'object' };

                const schemaElement = SchemaElement.refract(genericObjectElement);
                const actual = toValue(schemaElement.meta.get('inherited$schema'));
                const expected = toValue(JsonSchemaDialectElement.default);

                assert.strictEqual(actual, expected);
              });
            });
          },
        );

        context('given Schema Objects are defined after jsonSchemaDialect field', function () {
          specify(
            'should annotate Schema Object with jsonSchemaDialect field value',
            async function () {
              const genericObjectElement = await parse(`{
              "openapi": "3.1",
              "jsonSchemaDialect": "https://arbitrary-schema-url.com/",
              "components": {
                "schemas": {
                  "user": {
                    "type": "object"
                  }
                }
              }
            }`);
              const openApiElement = OpenApi3_1Element.refract(genericObjectElement.result);
              const schemaElement = find((e) => isSchemaElement(e), openApiElement);
              const actual = toValue(schemaElement?.meta.get('inherited$schema'));
              const expected = 'https://arbitrary-schema-url.com/';

              assert.strictEqual(actual, expected);
            },
          );
        });

        context('given Schema Objects are defined before jsonSchemaDialect field', function () {
          specify(
            'should annotate Schema Object with jsonSchemaDialect field value',
            async function () {
              const genericObjectElement = await parse(`{
              "openapi": "3.1",
              "components": {
                "schemas": {
                  "user": {
                    "type": "object"
                  }
                }
              },
              "jsonSchemaDialect": "https://arbitrary-schema-url.com/"
            }`);
              const openApiElement = OpenApi3_1Element.refract(genericObjectElement.result);
              const schemaElement = find((e) => isSchemaElement(e), openApiElement);
              const actual = toValue(schemaElement?.meta.get('inherited$schema'));
              const expected = 'https://arbitrary-schema-url.com/';

              assert.strictEqual(actual, expected);
            },
          );
        });

        context('given Schema Object with inner Schemas', function () {
          let genericObjectElement: any;
          let openApiElement: any;

          beforeEach(function () {
            genericObjectElement = new ObjectElement({
              openapi: '3.1.0',
              components: {
                schemas: {
                  user: {
                    $id: '1',
                    type: 'object',
                    oneOf: [
                      {
                        $id: '2',
                        type: 'number',
                        $schema: '$schema1',
                        contains: { $id: '3', type: 'object' },
                      },
                    ],
                    contains: {
                      $id: '4',
                      type: 'string',
                    },
                  },
                },
              },
            });
            openApiElement = OpenApi3_1Element.refract(genericObjectElement);
          });

          specify('should annotate Schema Object($id=1) with appropriate dialect', function () {
            const schemaElement = find(
              (e) => isSchemaElement(e) && isElement(e.$id) && e.$id.equals('1'),
              openApiElement,
            );
            const actual = toValue(schemaElement?.meta.get('inherited$schema'));
            const expected = toValue(JsonSchemaDialectElement.default);

            assert.strictEqual(actual, expected);
          });

          specify('should not annotate Schema Object($id=2) with any dialect', function () {
            const schemaElement = find(
              (e) => isSchemaElement(e) && isElement(e.$id) && e.$id.equals('2'),
              openApiElement,
            );
            // @ts-ignore
            const actual = toValue(schemaElement?.$schema);
            const expected = '$schema1';

            assert.strictEqual(actual, expected);
            assert.isFalse(schemaElement?.meta.hasKey('inherited$schema'));
          });

          specify('should annotate Schema Object($id=3) with appropriate dialect', function () {
            const schemaElement = find(
              (e) => isSchemaElement(e) && isElement(e.$id) && e.$id.equals('3'),
              openApiElement,
            );
            const actual = toValue(schemaElement?.meta.get('inherited$schema'));
            const expected = '$schema1';

            assert.strictEqual(actual, expected);
          });

          specify('should annotate Schema Object($id=4) with appropriate dialect', function () {
            const schemaElement = find(
              (e) => isSchemaElement(e) && isElement(e.$id) && e.$id.equals('4'),
              openApiElement,
            );
            const actual = toValue(schemaElement?.meta.get('inherited$schema'));
            const expected = toValue(JsonSchemaDialectElement.default);

            assert.strictEqual(actual, expected);
          });
        });
      });
    });
  });
});
