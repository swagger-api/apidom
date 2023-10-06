import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { ContactElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ContactElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const contactElement = ContactElement.refract({
          name: 'API Support',
          url: 'https://www.example.com/support',
          email: 'support@example.com',
        });

        expect(sexprs(contactElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const contactElement = ContactElement.refract({
          name: 'API support',
          'x-extension': 'extension',
        }) as ContactElement;

        assert.isFalse(
          includesClasses(['specification-extension'], contactElement.getMember('name')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], contactElement.getMember('x-extension')),
        );
      });
    });
  });
});
