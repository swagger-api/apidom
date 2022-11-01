import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { GooglePubSubServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('GooglePubSubServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const googlepubsubServerBindingElement = GooglePubSubServerBindingElement.refract({});

        expect(sexprs(googlepubsubServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
