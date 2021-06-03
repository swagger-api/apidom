import { expect } from 'chai';
import { sexprs } from 'apidom';

import { NatsChannelBindingElement } from '../../../../../../src';

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
