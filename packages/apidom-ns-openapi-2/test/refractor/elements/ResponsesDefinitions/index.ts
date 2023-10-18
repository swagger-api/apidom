import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { ResponsesDefinitionsElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('ResponsesDefinitionsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const responsesDefinitionsElement = ResponsesDefinitionsElement.refract({
          response1: {},
          response2: {},
        });

        expect(sexprs(responsesDefinitionsElement)).toMatchSnapshot();
      });
    });
  });
});
