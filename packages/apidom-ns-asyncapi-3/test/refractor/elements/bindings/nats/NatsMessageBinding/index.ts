import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { NatsMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('NatsMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const natsMessageBindingElement = NatsMessageBindingElement.refract({});

        expect(sexprs(natsMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
