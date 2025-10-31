import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { OperationElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('OperationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const operationElement = OperationElement.refract({
          action: 'send',
          title: 'operation-title',
          summary: 'operation-summary',
          description: 'operation-description',
          messages: [{ $ref: '#/path/to/message' }],
          channel: { $ref: '#/path/to/channel' },
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

      context('given security field contains list of type SecuritySchemeElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            security: [{ user_pass: [] }],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given security field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            security: [
              {
                $ref: '#/path/to/operation-security',
              },
            ],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given reply field of type OperationReplyElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            reply: {},
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given reply field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            reply: {
              $ref: '#/path/to/operation-trait',
            },
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type TagElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            tags: [{}],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given tags field contains list of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            tags: [
              {
                $ref: '#/path/to/tag',
              },
            ],
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ExternalDocumentationElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            externalDocs: {},
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });

      context('given externalDocs field of type ReferenceElement', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const operationElement = OperationElement.refract({
            externalDocs: {
              $ref: '#/path/to/external-docs',
            },
          });

          expect(sexprs(operationElement)).toMatchSnapshot();
        });
      });
    });
  });
});
