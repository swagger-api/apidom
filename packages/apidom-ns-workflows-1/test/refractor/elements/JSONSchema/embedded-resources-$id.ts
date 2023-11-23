import { assert } from 'chai';
import { find, toValue, isElement } from '@swagger-api/apidom-core';

import { isJSONSchemaElement, JSONSchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchemaElement', function () {
      context('$id keyword in embedded resources', function () {
        context('given JSONSchema Object without $id keyword', function () {
          specify('should have empty inherited$id', function () {
            const jsonSchemaElement = JSONSchemaElement.refract({});
            const actual = toValue(jsonSchemaElement.meta.get('inherited$id'));

            assert.deepEqual(actual, []);
          });
        });

        context('given JSONSchema Object with arbitrary fields boundaries', function () {
          specify('should annotate Schema($anchor=1) with inherited$id', function () {
            const jsonSchemaElement = JSONSchemaElement.refract({
              $id: './nested/',
              type: 'object',
              properties: {
                profile: {
                  $anchor: '1',
                  $ref: './ex.json',
                },
              },
            });
            const actual = toValue(jsonSchemaElement.meta.get('inherited$id'));

            assert.deepEqual(actual, ['./nested/']);
          });
        });

        context('given JSONSchema Object with inner Schemas', function () {
          let jsonSchemaElement: any;

          beforeEach(function () {
            jsonSchemaElement = JSONSchemaElement.refract({
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
            });
          });

          specify('should annotate JSONSchema Object($anchor=1) with inherited$id', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$anchor) && e.$anchor.equals('1'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement.meta.get('inherited$id'));

            assert.deepEqual(actual, []);
          });

          specify('should annotate JSONSchema Object($anchor=2) with inherited$id', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$anchor) && e.$anchor.equals('2'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement.meta.get('inherited$id'));

            assert.deepEqual(actual, ['$id1']);
          });

          specify('should annotate JSONSchema Object($anchor=3) with inherited$id', function () {
            const foundJsonSchemaElement = find(
              (e) => isJSONSchemaElement(e) && isElement(e.$anchor) && e.$anchor.equals('3'),
              jsonSchemaElement,
            );
            const actual = toValue(foundJsonSchemaElement.meta.get('inherited$id'));

            assert.deepEqual(actual, ['$id1', '$id2']);
          });

          specify(
            'should not annotate JSONSchema Object($anchor=4) with inherited$id',
            function () {
              const foundJsonSchemaElement = find(
                (e) => isJSONSchemaElement(e) && isElement(e.$anchor) && e.$anchor.equals('4'),
                jsonSchemaElement,
              );
              const actual = toValue(foundJsonSchemaElement.meta.get('inherited$id'));

              assert.deepEqual(actual, []);
            },
          );
        });
      });
    });
  });
});
