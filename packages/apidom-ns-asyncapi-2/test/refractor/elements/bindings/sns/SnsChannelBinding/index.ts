import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SnsChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SnsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsChannelBindingElement = SnsChannelBindingElement.refract({});

        expect(sexprs(snsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
