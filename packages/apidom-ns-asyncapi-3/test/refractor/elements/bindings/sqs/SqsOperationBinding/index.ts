import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SqsOperationBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('SqsOperationBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sqsOperationBindingElement = SqsOperationBindingElement.refract({});

        expect(sexprs(sqsOperationBindingElement)).toMatchSnapshot();
      });
    });
  });
});
