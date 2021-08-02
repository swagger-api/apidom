import { expect } from 'chai';
import { sexprs } from 'apidom';

import { CorrelationIDElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('CorrelationIDElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const correlationIDElement = CorrelationIDElement.refract({
          description: 'correlation-id-description',
          location: 'correlation-id-location',
        });

        expect(sexprs(correlationIDElement)).toMatchSnapshot();
      });
    });
  });
});
