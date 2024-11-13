import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationTraitElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationTraitElement = OperationTraitElement.refract({
          operationId: 'operation-trait-operationId',
          summary: 'operation-trait-summary',
          description: 'operation-trait-description',
          security: [{ petstore_auth: [] }],
          tags: [],
          externalDocs: {},
        });

        expect(sexprs(operationTraitElement)).toMatchSnapshot();
      });

      context('given bindings field of type OperationBindingsElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            bindings: {},
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given bindings field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            bindings: {
              $ref: '#/path/to/bindings',
            },
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });
    });
  });
});
