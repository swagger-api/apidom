import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('MessageElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageElement = MessageElement.refract({
          messageId: 'unique-id',
          schemaFormat: 'application/vnd.aai.asyncapi;version=2.5.0',
          contentType: 'application/json',
          name: 'message-name',
          title: 'message-title',
          summary: 'message-summary',
          description: 'message-description',
          tags: [],
          externalDocs: {},
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

    context('given implicit value of schemaFormat fixed field', function () {
      context('given payload field', function () {
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
    });

    context('given explicit value of schemaFormat fixed field', function () {
      context('given payload field', function () {
        specify('should refract payload to SchemaElement', function () {
          const messageElement = MessageElement.refract({
            schemaFormat: 'application/vnd.aai.asyncapi;version=2.5.0',
            payload: {},
          });

          expect(sexprs(messageElement)).toMatchSnapshot();
        });
      });

      context('given payload field of type ReferenceElement', function () {
        specify('should refract payload to ReferenceElement', function () {
          const messageElement = MessageElement.refract({
            schemaFormat: 'application/vnd.aai.asyncapi;version=2.5.0',
            payload: {
              $ref: '#/json-pointer',
            },
          });

          expect(sexprs(messageElement)).toMatchSnapshot();
        });
      });
    });

    context('given explicit unsupported value of schemaFormat fixed field', function () {
      context('given payload field', function () {
        specify('should refract payload to generic ObjectElement', function () {
          const messageElement = MessageElement.refract({
            schemaFormat: 'application/schema+json;version=draft-07',
            payload: {},
          });

          expect(sexprs(messageElement)).toMatchSnapshot();
        });
      });

      context('given payload field of type ReferenceElement', function () {
        specify('should refract payload to generic ObjectElement', function () {
          const messageElement = MessageElement.refract({
            schemaFormat: 'application/schema+json;version=draft-07',
            payload: {
              $ref: '#/json-pointer',
            },
          });

          expect(sexprs(messageElement)).toMatchSnapshot();
        });
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
  });
});
