import { assert } from 'chai';
import { find, toValue, isElement } from '@swagger-api/apidom-core';

import { JSONSchemaElement, isJSONSchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchemaElement', function () {
      context('$schema keyword in embedded resources', function () {
        context('given JSONSchema Object without $schema keyword', function () {
          specify('should annotate JSONSchema Object with default dialect', function () {
            const jsonSchemaElement = JSONSchemaElement.refract({
              $id: '1',
              type: 'object',
              not: {},
            }) as JSONSchemaElement;
            const actual = toValue(jsonSchemaElement.not?.meta.get('inherited$schema'));
            const expected = toValue('https://json-schema.org/draft/2020-12/schema');

            assert.strictEqual(actual, expected);
          });
        });

        context(
          'given direct refracting to JSONSchema Element from generic structure',
          function () {
            specify('should annotate Schema Object with default dialect', function () {
              const jsonSchemaElement = JSONSchemaElement.refract({
                $id: '1',
                type: 'object',
              }) as JSONSchemaElement;
              const actual = toValue(jsonSchemaElement.meta.get('inherited$schema'));
              const expected = 'https://json-schema.org/draft/2020-12/schema';

              assert.strictEqual(actual, expected);
            });
          },
        );

        context('given JSONSchema Object with inner Schemas', function () {
          let jsonSchemaElement: any;

          beforeEach(function () {
            jsonSchemaElement = JSONSchemaElement.refract({
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
            });
          });

          specify('should annotate Schema Object($id=1) with appropriate dialect', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$id) && e.$id.equals('1'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement.meta.get('inherited$schema'));
            const expected = 'https://json-schema.org/draft/2020-12/schema';

            assert.strictEqual(actual, expected);
          });

          specify('should not annotate Schema Object($id=2) with any dialect', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$id) && e.$id.equals('2'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement?.$schema);
            const expected = '$schema1';

            assert.strictEqual(actual, expected);
            assert.isFalse(foundJsonSchemaElement?.meta.hasKey('inherited$schema'));
          });

          specify('should annotate Schema Object($id=3) with appropriate dialect', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$id) && e.$id.equals('3'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement?.meta.get('inherited$schema'));
            const expected = '$schema1';

            assert.strictEqual(actual, expected);
          });

          specify('should annotate Schema Object($id=4) with appropriate dialect', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$id) && e.$id.equals('4'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement?.meta.get('inherited$schema'));
            const expected = 'https://json-schema.org/draft/2020-12/schema';

            assert.strictEqual(actual, expected);
          });
        });
      });
    });
  });
});
