import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationTraitElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationTraitElement = OperationTraitElement.refract({
          title: 'operation-trait-title',
          operationId: 'operation-trait-operationId',
          summary: 'operation-trait-summary',
          description: 'operation-trait-description',
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

      context('given security field contains list of type SecuritySchemeElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            security: [{}],
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given security field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            security: [
              {
                $ref: '#/path/to/security-scheme',
              },
            ],
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type TagElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            tags: [{}],
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            tags: [
              {
                $ref: '#/path/to/tag',
              },
            ],
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            externalDocs: {},
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationTraitElement = OperationTraitElement.refract({
            externalDocs: {
              $ref: '#/path/to/externalDocs',
            },
          });

          expect(sexprs(operationTraitElement)).toMatchSnapshot();
        });
      });
    });
  });
});
