import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { RequestBodyElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('RequestBodyElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const requestBodyElement = RequestBodyElement.refract({
          description: 'request-body-description',
          content: {
            mediaType: {},
          },
          required: true,
        });

        expect(sexprs(requestBodyElement)).toMatchSnapshot();
      });
    });
  });
});
