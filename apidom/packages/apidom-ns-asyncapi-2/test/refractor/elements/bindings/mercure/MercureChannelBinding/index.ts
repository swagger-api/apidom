import { expect } from 'chai';
import { sexprs } from 'apidom';

import { MercureChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MercureChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mercureChannelBindingElement = MercureChannelBindingElement.refract({});

        expect(sexprs(mercureChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
