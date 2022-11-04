import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglepubsubOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglepubsubOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubOperationBindingElement = GooglepubsubOperationBindingElement.refract({});

        expect(sexprs(googlepubsubOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
