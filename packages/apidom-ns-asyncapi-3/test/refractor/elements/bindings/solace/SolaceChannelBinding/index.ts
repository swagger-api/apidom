import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceChannelBindingElement = SolaceChannelBindingElement.refract({});

        expect(sexprs(solaceChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
