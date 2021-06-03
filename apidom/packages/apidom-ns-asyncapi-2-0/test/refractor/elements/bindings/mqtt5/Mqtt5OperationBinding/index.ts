import { expect } from 'chai';
import { sexprs } from 'apidom';

import { Mqtt5OperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('Mqtt5OperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqtt5OperationBindingElement = Mqtt5OperationBindingElement.refract({});

        expect(sexprs(mqtt5OperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
