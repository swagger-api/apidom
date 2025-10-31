import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MercureMessageBindingElement } from '../../../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MercureMessageBindingElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mercureMessageBindingElement = MercureMessageBindingElement.refract({});

        expect(sexprs(mercureMessageBindingElement)).toMatchSnapshot();
      });
    });
  });
});
