import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { ParameterElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ParameterElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const parameterElement = ParameterElement.refract({
          type: 'array',
          name: 'user',
          in: 'body',
          description: 'user to add to the system',
          required: true,
          schema: {},
          items: {},
        });

        expect(sexprs(parameterElement)).toMatchSnapshot();
      });

      context('given schema keyword in form of object with $ref property', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const parameterElement = ParameterElement.refract({
            schema: { $ref: '#/pointer' },
          });

          expect(sexprs(parameterElement)).toMatchSnapshot();
        });
      });

      specify('should support specification extensions', function () {
        const parameterElement = ParameterElement.refract({
          type: 'array',
          'x-extension': 'extension',
        }) as ParameterElement;

        assert.isFalse(
          includesClasses(['specification-extension'], parameterElement.getMember('type')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], parameterElement.getMember('x-extension')),
        );
      });
    });
  });
});
