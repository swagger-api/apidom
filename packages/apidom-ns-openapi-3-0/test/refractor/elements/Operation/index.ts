import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationElement } from '../../../../src/index.ts';

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
            parameters: [{}, { $ref: '#/components/parameters/Parameter1' }],
            requestBody: {},
            responses: {},
            callbacks: {
              callback1: {},
              callback2: { $ref: '#/components/callbacks/Callback1' },
            },
            deprecated: true,
            security: [{}],
            servers: [{}],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given requestBody field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            tags: ['tag1', 'tag2'],
            summary: 'operation-summary',
            description: 'operation-description',
            externalDocs: {},
            operationId: 'operation-operationId',
            parameters: [{}, { $ref: '#/components/parameters/Parameter1' }],
            requestBody: { $ref: '#/components/requestBodies/RequestBody' },
            responses: {},
            callbacks: {
              callback1: {},
              callback2: { $ref: '#/components/callbacks/Callback1' },
            },
            deprecated: true,
            security: [{}],
            servers: [{}],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });
    });
  });
});
