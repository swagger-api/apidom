import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SqsServerBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SqsServerBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sqsServerBindingElement = SqsServerBindingElement.refract({});

        expect(sexprs(sqsServerBindingElement)).toMatchSnapshot();
      });
    });
  });
});
