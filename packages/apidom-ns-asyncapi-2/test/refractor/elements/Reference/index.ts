import { assert, expect } from 'chai';
import { ObjectElement, sexprs, toValue } from '@swagger-api/apidom-core';

import { ReferenceElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const referenceElement = ReferenceElement.refract({
          $ref: '#/path/to/somewhere',
        });

        expect(sexprs(referenceElement)).toMatchSnapshot();
      });

      context('given generic ApiDOM element', function () {
        let referenceElement: ReferenceElement;

        beforeEach(function () {
          referenceElement = ReferenceElement.refract(
            new ObjectElement(
              { $ref: '#/path/to/somewhere' },
              { classes: ['example'] },
              { attr: true },
            ),
          ) as ReferenceElement;
        });

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(referenceElement)).toMatchSnapshot();
        });

        specify('should deepmerge meta', function () {
          assert.deepEqual(toValue(referenceElement.meta), {
            classes: ['json-reference', 'asyncapi-reference', 'example', 'reference-element'],
          });
        });

        specify('should deepmerge attributes', function () {
          assert.isTrue(referenceElement.attributes.get('attr').equals(true));
        });
      });
    });
  });
});
