import { expect } from 'chai';
import { sexprs } from 'apidom';

import { OpenApi3_1Element } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OpenApi3_1Element', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const openApiElement = OpenApi3_1Element.refract({
          openapi: '3.1.0',
          info: {},
          jsonSchemaDialect: 'https://spec.openapis.org/oas/3.1/dialect/base',
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
