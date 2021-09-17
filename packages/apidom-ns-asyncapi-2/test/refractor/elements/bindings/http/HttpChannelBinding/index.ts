import { expect } from 'chai';
import { sexprs } from 'apidom';

import { HttpChannelBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HttpChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const httpChannelBindingElement = HttpChannelBindingElement.refract({});

        expect(sexprs(httpChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
