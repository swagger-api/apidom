import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenApi3_0Element } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OpenApi3_0Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_0Element.refract({
          openapi: '3.0.3',
          info: {},
          servers: [{}],
          paths: {},
          components: {},
          security: [{}],
          tags: [{}],
          externalDocs: {},
        });

        expect(sexprs(openApiElement)).toMatchSnapshot();
      });
    });
  });
});
