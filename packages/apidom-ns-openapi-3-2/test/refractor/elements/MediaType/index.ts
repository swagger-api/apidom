import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MediaTypeElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MediaTypeElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const mediaTypeElement = MediaTypeElement.refract({
          schema: {},
          example: {},
          examples: {
            Example1: {},
            Example2: { $ref: '#/components/examples/Example1' },
          },
          encoding: {
            Encoding: {},
          },
        });

        expect(sexprs(mediaTypeElement)).toMatchSnapshot();
      });
    });
  });
});
