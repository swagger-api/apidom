import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SolaceMessageBindingElement } from '../../../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SolaceMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const solaceMessageBindingElement = SolaceMessageBindingElement.refract({});

        expect(sexprs(solaceMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
