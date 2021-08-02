import { expect } from 'chai';
import { sexprs } from 'apidom';

import { NatsServerBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('NatsServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const natsServerBindingElement = NatsServerBindingElement.refract({});

        expect(sexprs(natsServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
