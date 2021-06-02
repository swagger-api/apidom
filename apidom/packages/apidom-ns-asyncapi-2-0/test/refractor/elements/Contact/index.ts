import { expect } from 'chai';
import { sexprs } from 'apidom';

import { ContactElement } from '../../../../src';

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
    });
  });
});
