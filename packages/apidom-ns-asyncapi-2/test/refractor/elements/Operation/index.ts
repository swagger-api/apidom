import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationElement = OperationElement.refract({
          operationId: 'operation-operationId',
          summary: 'operation-summary',
          description: 'operation-description',
          security: [{ user_pass: [] }],
          tags: [],
          externalDocs: {},
        });

        expect(sexprs(operationElement)).toMatchSnapshot();
      });

      context('given bindings field of type OperationBindingsElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            bindings: {},
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given bindings field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            bindings: {
              $ref: '#/path/to/bindings',
            },
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given traits field contains list of type OperationTraitElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            traits: [{}],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given traits field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            traits: [
              {
                $ref: '#/path/to/operation-trait',
              },
            ],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given message field of type MessageElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            message: {},
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given message field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            message: { $ref: '#/path/to/message' },
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given message field of `oneOf` shape', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            message: {
              oneOf: [{}, { $ref: '#/path/to/message' }],
            },
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });
    });
  });
});
