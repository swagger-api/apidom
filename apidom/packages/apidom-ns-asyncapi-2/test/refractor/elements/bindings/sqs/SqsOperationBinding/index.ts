import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SqsOperationBindingElement } from '../../../../../../src';

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
