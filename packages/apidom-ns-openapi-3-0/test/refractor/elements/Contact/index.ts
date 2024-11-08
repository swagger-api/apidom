import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ContactElement } from '../../../../src/index.ts';

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
    });
  });
});
