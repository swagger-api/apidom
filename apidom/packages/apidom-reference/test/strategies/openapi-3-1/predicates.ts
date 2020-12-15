import { assert } from 'chai';
import {
  StringElement,
  ObjectElement,
  BooleanElement,
  ArrayElement,
  NumberElement,
  NullElement,
} from 'apidom';
import { ReferenceElement } from 'apidom-ns-openapi-3-1';

import { isExternalReferenceElement } from '../../../src/strategies/openapi-3-1/predicates';

describe('strategies', function () {
  context('openapi-3-1', function () {
    context('predicates', function () {
      context('isExternalReferenceElement', function () {
        context('given external reference element with URL', function () {
          specify('should return true', function () {
            const externalReferenceElement = new ReferenceElement({
              $ref: 'https://swagger.io/petstore.json',
              summary: 'summary',
              description: 'description',
            });

            assert.isTrue(isExternalReferenceElement(externalReferenceElement));
          });
        });

        context('given external reference element with hash', function () {
          specify('should return true', function () {
            const externalReferenceElement = new ReferenceElement({
              $ref: '#/path/to/data',
              summary: 'summary',
              description: 'description',
            });

            assert.isFalse(isExternalReferenceElement(externalReferenceElement));
          });
        });

        context('given other elements', function () {
          specify('should return false', function () {
            assert.isFalse(isExternalReferenceElement(new StringElement()));
            assert.isFalse(isExternalReferenceElement(new ObjectElement()));
            assert.isFalse(isExternalReferenceElement(new ArrayElement()));
            assert.isFalse(isExternalReferenceElement(new BooleanElement()));
            assert.isFalse(isExternalReferenceElement(new NumberElement()));
            assert.isFalse(isExternalReferenceElement(new NullElement()));
          });
        });

        context('given javascript value', function () {
          specify('should return false', function () {
            assert.isFalse(isExternalReferenceElement(null));
            assert.isFalse(isExternalReferenceElement(undefined));
            assert.isFalse(isExternalReferenceElement('string'));
            assert.isFalse(isExternalReferenceElement(true));
            assert.isFalse(isExternalReferenceElement(1));
            assert.isFalse(isExternalReferenceElement([]));
          });
        });
      });
    });
  });
});
