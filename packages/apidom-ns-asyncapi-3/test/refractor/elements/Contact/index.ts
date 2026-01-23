import { expect } from 'chai';
import { sexprs, includesClasses, ObjectElement } from '@swagger-api/apidom-core';

import { ContactElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('ContactElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const contactElement = ContactElement.refract({
          name: 'API Support',
          url: 'http://www.asyncapi.org/support',
          email: 'support@asyncapi.org',
        });

        expect(sexprs(contactElement)).toMatchSnapshot();
      });

      context('given specification extensions', function () {
        specify('should refract x- extension properties', function () {
          const contactElement = ContactElement.refract({
            name: 'API Support',
            email: 'support@example.com',
            'x-slack-channel': '#api-support',
          });

          expect(sexprs(contactElement)).toMatchSnapshot();
        });

        specify('should mark x- extensions with specification-extension class', function () {
          const contactElement = ContactElement.refract({
            name: 'API Support',
            email: 'support@example.com',
            'x-slack-channel': '#api-support',
          }) as ObjectElement;

          const extensionMember = contactElement.getMember('x-slack-channel');
          expect(includesClasses(['specification-extension'], extensionMember)).to.be.true;
        });
      });
    });
  });
});
