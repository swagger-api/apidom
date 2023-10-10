import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { HeaderElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HeaderElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const headerElement = HeaderElement.refract({
          description: 'The number of allowed requests in the current period',
          type: 'array',
          items: {
            type: 'integer',
            minimum: 0,
            maximum: 63,
            items: {
              items: {
                items: {},
              },
            },
          },
        });

        expect(sexprs(headerElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const headerElement = HeaderElement.refract({
          type: 'array',
          'x-extension': 'extension',
        }) as HeaderElement;

        assert.isFalse(
          includesClasses(['specification-extension'], headerElement.getMember('type')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], headerElement.getMember('x-extension')),
        );
      });
    });
  });
});
