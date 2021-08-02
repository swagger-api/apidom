import { expect } from 'chai';
import { sexprs } from 'apidom';

import { OperationTraitElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('OperationTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationTraitElement = OperationTraitElement.refract({
          operationId: 'operation-trait-operationId',
          summary: 'operation-trait-summary',
          description: 'operation-trait-description',
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
