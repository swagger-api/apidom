import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SnsMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SnsMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsMessageBindingElement = SnsMessageBindingElement.refract({});

        expect(sexprs(snsMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
