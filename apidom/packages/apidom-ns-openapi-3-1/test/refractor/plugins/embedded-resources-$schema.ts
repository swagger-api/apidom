import { assert } from 'chai';
import { ObjectElement, find } from 'apidom';

import { isSchemaElement, JsonSchemaDialectVisitor, OpenApi3_1Element } from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('embedded-resources-$schema', function () {
      context('given Schema Object without $schema field', function () {
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
          const actual = schemaElement?.meta.get('inherited$schema').toValue();
          const expected = JsonSchemaDialectVisitor.default.toValue();

          assert.strictEqual(actual, expected);
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
            (e) => isSchemaElement(e) && e.$id.equals('1'),
            openApiElement,
          );
          const actual = schemaElement?.meta.get('inherited$schema').toValue();
          const expected = JsonSchemaDialectVisitor.default.toValue();

          assert.strictEqual(actual, expected);
        });

        specify('should not annotate Schema Object($id=2) with any dialect', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$id.equals('2'),
            openApiElement,
          );
          // @ts-ignore
          const actual = schemaElement?.$schema.toValue();
          const expected = '$schema1';

          assert.strictEqual(actual, expected);
          assert.isFalse(schemaElement?.meta.hasKey('inherited$schema'));
        });

        specify('should annotate Schema Object($id=3) with appropriate dialect', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$id.equals('3'),
            openApiElement,
          );
          const actual = schemaElement?.meta.get('inherited$schema').toValue();
          const expected = '$schema1';

          assert.strictEqual(actual, expected);
        });

        specify('should annotate Schema Object($id=4) with appropriate dialect', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$id.equals('4'),
            openApiElement,
          );
          const actual = schemaElement?.meta.get('inherited$schema').toValue();
          const expected = JsonSchemaDialectVisitor.default.toValue();

          assert.strictEqual(actual, expected);
        });
      });
    });
  });
});
