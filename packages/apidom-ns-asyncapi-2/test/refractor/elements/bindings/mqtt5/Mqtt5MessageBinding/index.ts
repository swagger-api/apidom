import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Mqtt5MessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Mqtt5MessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqtt5MessageBindingElement = Mqtt5MessageBindingElement.refract({});

        expect(sexprs(mqtt5MessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
