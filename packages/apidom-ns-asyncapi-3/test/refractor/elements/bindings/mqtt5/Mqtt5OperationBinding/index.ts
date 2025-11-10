import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Mqtt5OperationBindingElement } from '../../../../../../src/index.ts';

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
