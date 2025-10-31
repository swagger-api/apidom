import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageTraitElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MessageTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          contentType: 'application/json',
          name: 'message-trait-name',
          title: 'message-trait-title',
          summary: 'message-trait-summary',
          description: 'message-trait-description',
          examples: [
            {
              payload: {},
              headers: {},
              name: 'example name',
              summary: 'example summary',
            },
          ],
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type SchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          headers: {},
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          headers: {
            $ref: '#/path/to/schema',
          },
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type MultiFormatSchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          headers: {
            schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
            schema: {},
          },
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given correlationId field of type CorrelationIDElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          correlationId: {},
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given correlationId field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          correlationId: {
            $ref: '#/path/to/correlationID',
          },
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given bindings field of type MessageBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          bindings: {},
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given bindings field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          bindings: {
            $ref: '#/path/to/message-bindings',
          },
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given tags field contains list of type TagElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          tags: [{}],
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given tags field contains list of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          tags: [
            {
              $ref: '#/path/to/tag',
            },
          ],
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given externalDocs field of type ExternalDocumentationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          externalDocs: {},
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });

    context('given externalDocs field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          externalDocs: {
            $ref: '#/path/to/externalDocs',
          },
        });

        expect(sexprs(messageTraitElement)).toMatchSnapshot();
      });
    });
  });
});
