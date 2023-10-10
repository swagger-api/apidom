import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { ItemsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ItemsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const itemsElement = ItemsElement.refract({
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

        expect(sexprs(itemsElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const itemsElement = ItemsElement.refract({
          type: 'array',
          'x-extension': 'extension',
        }) as ItemsElement;

        assert.isFalse(
          includesClasses(['specification-extension'], itemsElement.getMember('type')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], itemsElement.getMember('x-extension')),
        );
      });
    });
  });
});
