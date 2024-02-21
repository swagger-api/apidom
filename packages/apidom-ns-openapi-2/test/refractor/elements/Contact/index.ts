import { assert, expect } from 'chai';
import { includesClasses, sexprs, ObjectElement } from '@swagger-api/apidom-core';

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

      context('given generic ApiDOM element', function () {
        let contactElement: ContactElement;

        beforeEach(function () {
          contactElement = ContactElement.refract(
            new ObjectElement(
              {
                name: 'API Support',
                url: 'https://www.example.com/support',
                email: 'support@example.com',
              },
              { meta: true },
              { attr: true },
            ),
          ) as ContactElement;
        });

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(contactElement)).toMatchSnapshot();
        });

        specify('should retain attributes', function () {
          assert.isTrue(contactElement.attributes.get('attr').equals(true));
        });

        specify('should retain meta', function () {
          assert.isTrue(contactElement.meta.get('meta').equals(true));
        });
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
