import { assert, expect } from 'chai';
import { includesClasses, sexprs } from '@swagger-api/apidom-core';

import { OperationElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OperationElement', function () {
      context('given requestBody field of type RequestBodyElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            tags: ['tag1', 'tag2'],
            summary: 'operation-summary',
            description: 'operation-description',
            externalDocs: {},
            operationId: 'operation-operationId',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [{}, { $ref: '#/parameters/parameter1' }],
            responses: {},
            schemes: ['http', 'https'],
            deprecated: true,
            security: [{}],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });

        specify('should support specification extensions', function () {
          const operationElement = OperationElement.refract({
            summary: 'operation-summary',
            'x-extension': 'extension',
          }) as OperationElement;

          assert.isFalse(
            includesClasses(['specification-extension'], operationElement.getMember('summary')),
          );
          assert.isTrue(
            includesClasses(['specification-extension'], operationElement.getMember('x-extension')),
          );
        });
      });
    });
  });
});
