import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglepubsubServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglepubsubServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubServerBindingElement = GooglepubsubServerBindingElement.refract({});

        expect(sexprs(googlepubsubServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
