import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { HeadersElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('HeadersElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const headersElement = HeadersElement.refract({
          header1: {},
          header2: {},
        });

        expect(sexprs(headersElement)).toMatchSnapshot();
      });
    });
  });
});
