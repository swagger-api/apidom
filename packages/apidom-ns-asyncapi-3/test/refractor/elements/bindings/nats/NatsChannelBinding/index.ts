import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { NatsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('NatsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const natsChannelBindingElement = NatsChannelBindingElement.refract({});

        expect(sexprs(natsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
