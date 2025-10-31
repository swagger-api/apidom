import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MessageElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          contentType: 'application/json',
          name: 'message-name',
          title: 'message-title',
          summary: 'message-summary',
          description: 'message-description',
          examples: [
            {
              payload: {},
              headers: {},
              name: 'example name',
              summary: 'example summary',
            },
          ],
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type SchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          headers: {},
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          headers: {
            $ref: '#/path/to/schema',
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given headers field of type MultiFormatSchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          headers: {
            schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
            schema: {},
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given payload field of type SchemaElement', function () {
      specify('should refract payload to SchemaElement', function () {
        const messageElement = MessageElement.refract({
          payload: {},
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given payload field of type ReferenceElement', function () {
      specify('should refract payload to ReferenceElement', function () {
        const messageElement = MessageElement.refract({
          payload: {
            $ref: '#/json-pointer',
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given payload field of type MultiFormatSchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          payload: {
            schemaFormat: 'application/vnd.aai.asyncapi;version=3.0.0',
            schema: {},
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given payload field of other type', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          payload: true,
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given correlationId field of type CorrelationIDElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          correlationId: {},
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given correlationId field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          correlationId: {
            $ref: '#/path/to/correlationID',
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given bindings field of type MessageBindingsElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          bindings: {},
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given bindings field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          bindings: {
            $ref: '#/path/to/message-bindings',
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given traits field contains list of type MessageTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          traits: [{}],
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given traits field contains list of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          traits: [
            {
              $ref: '#/path/to/message-bindings',
            },
          ],
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given tags field contains list of type TagElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          tags: [{}],
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given tags field contains list of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          tags: [
            {
              $ref: '#/path/to/tag',
            },
          ],
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given externalDocs field of type ExternalDocumentationElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          externalDocs: {},
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });

    context('given externalDocs field of type ReferenceElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          externalDocs: {
            $ref: '#/path/to/externalDocs',
          },
        });

        expect(sexprs(messageElement)).toMatchSnapshot();
      });
    });
  });
});
