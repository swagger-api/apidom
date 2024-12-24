import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenApi3_0Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OpenApi3_0Element', function () {
      specify('should refract OpenAPI 3.0.0 to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_0Element.refract({
          openapi: '3.0.0',
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

      specify('should refract OpenAPI 3.0.1 to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_0Element.refract({
          openapi: '3.0.1',
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

      specify('should refract OpenAPI 3.0.2 to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_0Element.refract({
          openapi: '3.0.2',
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

      specify('should refract OpenAPI 3.0.3 to semantic ApiDOM tree', function () {
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

      specify('should refract OpenAPI 3.0.4 to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_0Element.refract({
          openapi: '3.0.4',
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
