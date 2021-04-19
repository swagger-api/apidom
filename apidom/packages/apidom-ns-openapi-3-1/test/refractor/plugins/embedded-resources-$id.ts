import { assert } from 'chai';
import { ObjectElement, find } from 'apidom';

import { isSchemaElement, OpenApi3_1Element } from '../../../src';

describe('refractor', function () {
  context('plugins', function () {
    context('embedded-resources-$id', function () {
      context('given Schema Object without $id field', function () {
        specify('should not inherited $id from parent schema', function () {
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
          const actual = schemaElement?.meta.get('inherited$id');

          assert.isUndefined(actual);
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
                  $anchor: '1',
                  type: 'object',
                  oneOf: [
                    {
                      $id: '$id1',
                      $anchor: '2',
                      type: 'number',
                      contains: { $anchor: '3', type: 'object' },
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

        specify('should not annotate Schema Object($anchor=1) with inherited $id', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$anchor.equals('1'),
            openApiElement,
          );
          const actual = schemaElement?.meta.get('inherited$id');

          assert.isUndefined(actual);
        });

        specify('should have Schema Object($anchor=2) $id set for appropriate value', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$anchor.equals('2'),
            openApiElement,
          );
          // @ts-ignore
          const actual = schemaElement?.$id.toValue();
          const expected = '$id1';

          assert.strictEqual(actual, expected);
          assert.isFalse(schemaElement?.meta.hasKey('inherited$id'));
        });

        specify(
          'should annotate Schema Object($anchor=3) with appropriate inherited $id',
          function () {
            const schemaElement = find(
              (e) => isSchemaElement(e) && e.$anchor.equals('3'),
              openApiElement,
            );
            const actual = schemaElement?.meta.get('inherited$id').toValue();
            const expected = '$id1';

            assert.strictEqual(actual, expected);
          },
        );

        specify('should not annotate Schema Object($anchor=4) with inherited $id', function () {
          const schemaElement = find(
            (e) => isSchemaElement(e) && e.$anchor.equals('4'),
            openApiElement,
          );
          const actual = schemaElement?.meta.get('inherited$id');

          assert.isUndefined(actual);
        });
      });
    });
  });
});
