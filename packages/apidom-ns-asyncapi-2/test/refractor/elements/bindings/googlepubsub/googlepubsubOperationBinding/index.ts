import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglePubSubOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglePubSubOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubOperationBindingElement = GooglePubSubOperationBindingElement.refract({});

        expect(sexprs(googlepubsubOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
