import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { Mqtt5ServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('Mqtt5ServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mqtt5ServerBindingElement = Mqtt5ServerBindingElement.refract({});

        expect(sexprs(mqtt5ServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
