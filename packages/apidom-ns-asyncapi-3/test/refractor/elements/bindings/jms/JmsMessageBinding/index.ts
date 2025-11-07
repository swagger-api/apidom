import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JmsMessageBindingElement } from '../../../../../../src/index.ts';

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
