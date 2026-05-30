import { assert } from 'chai';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import { SchemaElement } from '@swagger-api/apidom-ns-openapi-3-2';

import {
  isDynamicAnchor,
  uriToDynamicAnchor,
  parse,
  evaluate,
  InvalidJsonSchema$dynamicAnchorError,
  EvaluationJsonSchema$dynamicAnchorError,
} from '../../../../../../src/dereference/strategies/openapi-3-2/selectors/$dynamicAnchor.ts';

describe('dereference', function () {
  context('strategies', function () {
    context('openapi-3-2', function () {
      context('$dynamicAnchor selector', function () {
        context('given isDynamicAnchor', function () {
          specify('should return true for valid anchor names', function () {
            assert.isTrue(isDynamicAnchor('foo'));
            assert.isTrue(isDynamicAnchor('_bar'));
            assert.isTrue(isDynamicAnchor('My-Anchor.1'));
            assert.isTrue(isDynamicAnchor('A'));
          });

          specify('should return false for invalid anchor names', function () {
            assert.isFalse(isDynamicAnchor(''));
            assert.isFalse(isDynamicAnchor('1starts'));
            assert.isFalse(isDynamicAnchor('has space'));
            assert.isFalse(isDynamicAnchor('has/sash'));
            assert.isFalse(isDynamicAnchor('#fragment'));
          });
        });

        context('given uriToDynamicAnchor', function () {
          specify('should extract anchor token from URI fragment', function () {
            assert.strictEqual(uriToDynamicAnchor('https://example.com/#myAnchor'), 'myAnchor');
            assert.strictEqual(uriToDynamicAnchor('#myAnchor'), 'myAnchor');
          });

          specify('should return empty string for URI without fragment', function () {
            assert.strictEqual(uriToDynamicAnchor('https://example.com/'), '');
          });
        });

        context('given parse', function () {
          specify('should return valid anchor', function () {
            assert.strictEqual(parse('myAnchor'), 'myAnchor');
          });

          specify('should throw for invalid anchor', function () {
            assert.throws(
              () => parse('1invalid'),
              InvalidJsonSchema$dynamicAnchorError,
            );
          });
        });

        context('given evaluate', function () {
          specify('should find element with matching $dynamicAnchor', function () {
            const element = new SchemaElement({
              $dynamicAnchor: 'target',
              type: 'object',
            });
            const result = evaluate('target', element)!;

            assert.strictEqual(toValue((result as any).$dynamicAnchor), 'target');
          });

          specify('should throw when no matching $dynamicAnchor found', function () {
            const element = new SchemaElement({ type: 'object' });

            assert.throws(
              () => evaluate('missing', element),
              EvaluationJsonSchema$dynamicAnchorError,
            );
          });
        });
      });
    });
  });
});
