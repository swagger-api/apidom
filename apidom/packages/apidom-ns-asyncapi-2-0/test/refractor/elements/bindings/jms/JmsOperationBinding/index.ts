import { expect } from 'chai';
import { sexprs } from 'apidom';

import { JmsOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JmsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsOperationBindingElement = JmsOperationBindingElement.refract({});

        expect(sexprs(jmsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
