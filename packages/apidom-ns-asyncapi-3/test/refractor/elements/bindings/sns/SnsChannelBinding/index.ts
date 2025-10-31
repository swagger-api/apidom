import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SnsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SnsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const snsChannelBindingElement = SnsChannelBindingElement.refract({});

        expect(sexprs(snsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
