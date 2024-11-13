import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { JmsOperationBindingElement } from '../../../../../../src/index.ts';

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
