import { expect, assert } from 'chai';
import { sexprs } from '@swagger-api/apidom-core';

import { SchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('SchemaElement', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const schemaElement = SchemaElement.refract({
          // JSON Schema vocabulary
          id: 'http://x.y.z/rootschema.json#',
          $schema: 'http://json-schema.org/draft-04/schema#',
          multipleOf: 1,
          maximum: 2,
          exclusiveMaximum: true,
          minimum: 4,
          exclusiveMinimum: false,
          maxLength: 6,
          minLength: 7,
          pattern: '[a-z]+',
          additionalItems: {},
          items: [{}],
          maxItems: 8,
          minItems: 9,
          uniqueItems: true,
          maxProperties: 10,
          minProperties: 11,
          required: ['prop1', 'prop2'],
          properties: { prop1: {} },
          additionalProperties: {},
          patternProperties: { '[a-z]+': {} },
          dependencies: { dep1: {} },
          enum: [1, '2', null],
          type: 'string',
          allOf: [{}],
          anyOf: [{}],
          oneOf: [{}],
          not: {},
          definitions: { def1: {} },
          title: 'title',
          description: 'description',
          default: 3,
          format: 'url',
          base: '/object/{id}',
          links: [{}],
          media: {},
          readOnly: false,
          // OpenAPI vocabulary,
          nullable: true,
          discriminator: {},
          writeOnly: false,
          xml: {},
          externalDocs: {},
          example: 1,
          deprecated: true,
        });

        expect(sexprs(schemaElement)).toMatchSnapshot();
      });

      context('given items keyword in form of object', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = SchemaElement.refract({
            items: {},
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });

      context('given embedded SchemaElements', function () {
        specify('should refract to semantic ApiDOM tree', function () {
          const schemaElement = SchemaElement.refract({
            definitions: {
              enabledToggle: { not: {} },
            },
            allOf: [{ not: {} }],
          });

          expect(sexprs(schemaElement)).toMatchSnapshot();
        });
      });

      context('given allOf keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          allOf: [{ $ref: '#/path/to/schema' }],
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.allOf?.get(0);
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });

      context('given anyOf keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          anyOf: [{ $ref: '#/path/to/schema' }],
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.anyOf?.get(0);
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });

      context('given oneOf keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          oneOf: [{ $ref: '#/path/to/schema' }],
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.oneOf?.get(0);
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });

      context('given dependencies keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          dependencies: { dep1: { $ref: '#/path/to/schema' } },
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.dependencies?.get('dep1');
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });

      context('given properties keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          properties: { prop1: { $ref: '#/path/to/schema' } },
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.properties?.get('prop1');
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });

      context('given patternProperties keyword with reference', function () {
        const schemaElement = SchemaElement.refract({
          patternProperties: { pattern: { $ref: '#/path/to/schema' } },
        }) as SchemaElement;

        specify('should refract to semantic ApiDOM tree', function () {
          expect(sexprs(schemaElement)).toMatchSnapshot();
        });

        specify('should contain referenced-element meta', function () {
          const referenceElement = schemaElement.patternProperties?.get('pattern');
          const referencedElementMeta = referenceElement?.getMetaProperty('referenced-element');

          assert.strictEqual(referencedElementMeta.toValue(), 'schema');
        });
      });
    });
  });
});
