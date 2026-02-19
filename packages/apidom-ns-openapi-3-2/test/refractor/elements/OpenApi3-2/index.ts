import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OpenApi3_2Element } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OpenApi3_2Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_2Element.refract({
          openapi: '3.2.0',
          $self: 'https://example.com/api/v1/openapi.json',
          info: {},
          jsonSchemaDialect: 'https://spec.openapis.org/oas/3.2/dialect/2025-09-17',
          servers: [{}],
          paths: {},
          webhooks: {
            pathItem1: {},
            pathItem2: { $ref: '#/path/to/path-item' },
          },
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
