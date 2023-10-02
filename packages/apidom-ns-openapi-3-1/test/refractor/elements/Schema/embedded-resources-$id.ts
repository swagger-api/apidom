import { assert } from 'chai';
import { ObjectElement, find, toValue } from '@swagger-api/apidom-core';

import { isSchemaElement, OpenApi3_1Element } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SchemaElement', function () {
      context('plugins', function () {
        context('$id keyword in embedded resources', function () {
          context('given Schema Object without $id keyword', function () {
            specify('should have empty inherited$id', function () {
              const genericObjectElement = new ObjectElement({
                openapi: '3.1.0',
                components: {
                  schemas: {
                    user: {
                      type: 'object',
                    },
                  },
                },
              });
              const openApiElement = OpenApi3_1Element.refract(genericObjectElement);
              const schemaElement = find((e) => isSchemaElement(e), openApiElement);
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, []);
            });
          });

          context('given Schema Object with arbitrary fields boundaries', function () {
            specify('should annotate Schema($anchor=1) with inherited$id', function () {
              const genericObjectElement = new ObjectElement({
                openapi: '3.1.0',
                components: {
                  schemas: {
                    User: {
                      $id: './nested/',
                      type: 'object',
                      properties: {
                        profile: {
                          $anchor: '1',
                          $ref: './ex.json',
                        },
                      },
                    },
                  },
                },
              });
              const openApiElement = OpenApi3_1Element.refract(genericObjectElement);
              const schemaElement = find(
                (e) => isSchemaElement(e) && e.$anchor && e.$anchor.equals('1'),
                openApiElement,
              );
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, ['./nested/']);
            });
          });

          context('given Schema Object with inner Schemas', function () {
            let genericObjectElement: any;
            let openApiElement: any;

            beforeEach(function () {
              genericObjectElement = new ObjectElement({
                openapi: '3.1.0',
                components: {
                  schemas: {
                    User: {
                      $anchor: '1',
                      type: 'object',
                      oneOf: [
                        {
                          $id: '$id1',
                          $anchor: '2',
                          type: 'number',
                          contains: { $id: '$id2', $anchor: '3', type: 'object' },
                        },
                      ],
                      contains: {
                        $anchor: '4',
                        type: 'string',
                      },
                    },
                  },
                },
              });
              openApiElement = OpenApi3_1Element.refract(genericObjectElement);
            });

            specify('should annotate Schema Object($anchor=1) with inherited$id', function () {
              const schemaElement = find(
                (e) => isSchemaElement(e) && e.$anchor.equals('1'),
                openApiElement,
              );
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, []);
            });

            specify('should annotate Schema Object($anchor=2) with inherited$id', function () {
              const schemaElement = find(
                (e) => isSchemaElement(e) && e.$anchor.equals('2'),
                openApiElement,
              );
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, ['$id1']);
            });

            specify('should annotate Schema Object($anchor=3) with inherited$id', function () {
              const schemaElement = find(
                (e) => isSchemaElement(e) && e.$anchor.equals('3'),
                openApiElement,
              );
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, ['$id1', '$id2']);
            });

            specify('should not annotate Schema Object($anchor=4) with inherited$id', function () {
              const schemaElement = find(
                (e) => isSchemaElement(e) && e.$anchor.equals('4'),
                openApiElement,
              );
              const actual = toValue(schemaElement?.meta.get('inherited$id'));

              assert.deepEqual(actual, []);
            });
          });
        });
      });
    });
  });
});
