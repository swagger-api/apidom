import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { SwaggerElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SwaggerElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const infoElement = SwaggerElement.refract({
          swagger: '2.0',
          info: {},
          host: 'https://example.com/terms/',
          basePath: '/base-path',
          schemes: ['https'],
          consumes: ['application/json'],
          produces: ['application/json'],
          paths: {
            '/path': {},
          },
          definitions: {
            schema: {},
          },
          parameters: {
            parameter: {},
          },
          responses: {
            response: {},
          },
          securityDefinitions: {
            api_key: {},
          },
          security: [{}],
          tags: [{}],
          externalDocs: {},
        });

        expect(sexprs(infoElement)).toMatchSnapshot();
      });

      specify('should support specification extensions', function () {
        const swaggerElement = SwaggerElement.refract({
          swagger: '2.0',
          'x-extension': 'extension',
        }) as SwaggerElement;

        assert.isFalse(
          includesClasses(['specification-extension'], swaggerElement.getMember('swagger')),
        );
        assert.isTrue(
          includesClasses(['specification-extension'], swaggerElement.getMember('x-extension')),
        );
      });
    });
  });
});
