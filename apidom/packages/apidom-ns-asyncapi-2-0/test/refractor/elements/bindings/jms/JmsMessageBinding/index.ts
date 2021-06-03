import { expect } from 'chai';
import { sexprs } from 'apidom';

import { JmsMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JmsMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jmsMessageBindingElement = JmsMessageBindingElement.refract({});

        expect(sexprs(jmsMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
