import { expect } from 'chai';
import { sexprs } from 'apidom';

import { SqsMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SqsMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const sqsMessageBindingElement = SqsMessageBindingElement.refract({});

        expect(sexprs(sqsMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
