import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { ResponseElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ResponseElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const responseElement = ResponseElement.refract({
          description: 'response description',
          schema: {},
          headers: {},
          examples: {},
        });

        expect(sexprs(responseElement)).toMatchSnapshot();
      });

      context('given schema keyword in form of object with $ref property', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const responseElement = ResponseElement.refract({
            schema: { $ref: '#/pointer' },
          });

          expect(sexprs(responseElement)).toMatchSnapshot();
        });
      });

      specify('should support specification extensions', function () {
        const responseElement = ResponseElement.refract({
          description: 'response description',
          'x-extension': 'extension',
        }) as ResponseElement;

        assert.isFalse(
          includesClasses(['specification-extension'], responseElement.getMember('description')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], responseElement.getMember('x-extension')),
        );
      });
    });
  });
});
