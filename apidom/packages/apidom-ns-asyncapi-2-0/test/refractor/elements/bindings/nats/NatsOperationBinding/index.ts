import { expect } from 'chai';
import { sexprs } from 'apidom';

import { NatsOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('NatsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const natsOperationBindingElement = NatsOperationBindingElement.refract({});

        expect(sexprs(natsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
