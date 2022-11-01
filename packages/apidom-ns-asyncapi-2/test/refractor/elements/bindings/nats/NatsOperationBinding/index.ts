import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { NatsOperationBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('NatsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const natsOperationBindingElement = NatsOperationBindingElement.refract({
          queue: 'test',
          bindingVersion: '0.1.0',
        });

        expect(sexprs(natsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
