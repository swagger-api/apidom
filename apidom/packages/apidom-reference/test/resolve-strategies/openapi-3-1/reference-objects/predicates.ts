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

import {
  isExternalReferenceElement,
  isReferenceLikeElement,
  isExternalReferenceLikeElement,
} from '../../../../src/resolve-strategies/openapi-3-1/reference-objects/predicates';

describe('resolve-strategies', function () {
  context('openapi-3-1', function () {
    context('reference-objects', function () {
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

        context('isReferenceLikeElement', function () {
          context('given reference element with URI', function () {
            specify('should return true', function () {
              const referenceLikeElement = new ObjectElement({
                $ref: 'https://swagger.io/petstore.json',
                summary: 'summary',
                description: 'description',
              });

              assert.isTrue(isReferenceLikeElement(referenceLikeElement));
            });
          });

          context('given other elements', function () {
            specify('should return false', function () {
              assert.isFalse(isReferenceLikeElement(new StringElement()));
              assert.isFalse(isReferenceLikeElement(new ObjectElement()));
              assert.isFalse(isReferenceLikeElement(new ArrayElement()));
              assert.isFalse(isReferenceLikeElement(new BooleanElement()));
              assert.isFalse(isReferenceLikeElement(new NumberElement()));
              assert.isFalse(isReferenceLikeElement(new NullElement()));
            });
          });

          context('given javascript value', function () {
            specify('should return false', function () {
              assert.isFalse(isReferenceLikeElement(null));
              assert.isFalse(isReferenceLikeElement(undefined));
              assert.isFalse(isReferenceLikeElement('string'));
              assert.isFalse(isReferenceLikeElement(true));
              assert.isFalse(isReferenceLikeElement(1));
              assert.isFalse(isReferenceLikeElement([]));
            });
          });
        });

        context('isExternalReferenceLikeElement', function () {
          context('given external reference element with URL', function () {
            specify('should return true', function () {
              const externalReferenceLikeElement = new ObjectElement({
                $ref: 'https://swagger.io/petstore.json',
                summary: 'summary',
                description: 'description',
              });

              assert.isTrue(isExternalReferenceLikeElement(externalReferenceLikeElement));
            });
          });

          context('given external reference like element with hash', function () {
            specify('should return true', function () {
              const externalReferenceLikeElement = new ObjectElement({
                $ref: '#/path/to/data',
                summary: 'summary',
                description: 'description',
              });

              assert.isFalse(isExternalReferenceLikeElement(externalReferenceLikeElement));
            });
          });

          context('given other elements', function () {
            specify('should return false', function () {
              assert.isFalse(isExternalReferenceLikeElement(new StringElement()));
              assert.isFalse(isExternalReferenceLikeElement(new ObjectElement()));
              assert.isFalse(isExternalReferenceLikeElement(new ArrayElement()));
              assert.isFalse(isExternalReferenceLikeElement(new BooleanElement()));
              assert.isFalse(isExternalReferenceLikeElement(new NumberElement()));
              assert.isFalse(isExternalReferenceLikeElement(new NullElement()));
            });
          });

          context('given javascript value', function () {
            specify('should return false', function () {
              assert.isFalse(isExternalReferenceLikeElement(null));
              assert.isFalse(isExternalReferenceLikeElement(undefined));
              assert.isFalse(isExternalReferenceLikeElement('string'));
              assert.isFalse(isExternalReferenceLikeElement(true));
              assert.isFalse(isExternalReferenceLikeElement(1));
              assert.isFalse(isExternalReferenceLikeElement([]));
            });
          });
        });
      });
    });
  });
});
