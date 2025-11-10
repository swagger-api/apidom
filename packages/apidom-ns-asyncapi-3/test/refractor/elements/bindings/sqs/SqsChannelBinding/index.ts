import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SqsChannelBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SqsChannelBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sqsChannelBindingElement = SqsChannelBindingElement.refract({});

        expect(sexprs(sqsChannelBindingElement)).toMatchSnapshot();
      });
    });
  });
});
