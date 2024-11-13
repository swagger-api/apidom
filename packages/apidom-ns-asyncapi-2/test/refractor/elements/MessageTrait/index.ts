import { expect } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { MessageTraitElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('MessageTraitElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const messageTraitElement = MessageTraitElement.refract({
          messageId: 'unique-id',
          schemaFormat: 'application/schema+json;version=draft-07',
          contentType: 'application/json',
          name: 'message-trait-name',
          title: 'message-trait-title',
          summary: 'message-trait-summary',
          description: 'message-trait-description',
          tags: [],
          externalDocs: {},
          examples: [{ a: 1 }],
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
  });
});
