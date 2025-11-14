import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { NatsServerBindingElement } from '../../../../../../src/index.ts';

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
