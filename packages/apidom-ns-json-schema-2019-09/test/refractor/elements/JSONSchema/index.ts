import { assert, expect } from 'chai';
import { ObjectElement, sexprs, toValue, find, isElement } from '@swagger-api/apidom-core';

import { JSONSchemaElement, isJSONSchemaElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchema', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          $id: 'http://x.y.z/rootschema.json#',
          $schema: 'https://json-schema.org/draft/2019-09/schema',
          $comment: 'this is comment',
          multipleOf: 1,
          maximum: 2,
          exclusiveMaximum: 3,
          minimum: 4,
          exclusiveMinimum: 5,
          maxLength: 6,
          minLength: 7,
          pattern: '[a-z]+',
          additionalItems: {},
          items: [{}],
          maxItems: 8,
          minItems: 9,
          uniqueItems: true,
          contains: {},
          maxProperties: 10,
          minProperties: 11,
          required: ['prop1', 'prop2'],
          properties: { prop1: {} },
          additionalProperties: {},
          patternProperties: { '[a-z]+': {} },
          dependentSchemas: { dep1: {} },
          propertyNames: {},
          if: {},
          then: {},
          else: {},
          enum: [1, '2', null],
          const: 1,
          type: 'string',
          allOf: [{}],
          anyOf: [{}],
          oneOf: [{}],
          not: {},
          $defs: { def1: {} },
          contentEncoding: 'base64',
          contentMediaType: 'image/png',
          title: 'title',
          description: 'description',
          default: 3,
          examples: [1, 'string'],
          format: 'url',
          base: '/object/{id}',
          links: [{}],
          readOnly: false,
          writeOnly: true,
          $vocabulary: { 'http://example.com/vocab#': true },
          $anchor: 'anchor',
          recursiveAnchor: true,
          $ref: '#anchor',
          $recursiveRef: '#anchor',
          unevaluatedItems: {},
          unevaluatedProperties: {},
          maxContains: 3,
          minContains: 1,
          dependentRequired: { prop1: ['prop2'] },
          deprecated: true,
          contentSchema: {},
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });
    });

    context('JSONSchema with alternate field values', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: true,
          items: {},
          contains: true,
          additionalProperties: true,
          propertyNames: true,
          type: ['string', 'number'],
          unevaluatedItems: true,
          unevaluatedProperties: true,
          contentSchema: true,
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });
    });

    context('Boolean JSON Schema support', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: true,
          items: true,
          contains: true,
          additionalProperties: false,
          patternProperties: { '[a-z]+': true },
          dependentSchemas: { dep1: false },
          propertyNames: true,
          if: true,
          then: false,
          else: true,
          allOf: [true],
          anyOf: [true],
          oneOf: [false],
          not: false,
          $defs: { def1: true },
          unevaluatedItems: true,
          unevaluatedProperties: true,
          contentSchema: true,
        });

        expect(jsonSchemaElement).toMatchSnapshot();
      });
    });

    context('given JSONSchema ancestors are embedded resources', function () {
      specify('should expose ancestors schema identifiers as metadata', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          type: 'array',
          oneOf: [
            {
              $id: '$id1',
              type: 'number',
              items: { $id: '$id2', type: 'object' },
            },
          ],
          items: {
            type: 'string',
          },
        });
        const foundJsonSchemaElement = find(
          (e) => isJSONSchemaElement(e) && isElement(e.$id) && e.$id.equals('$id2'),
          jsonSchemaElement,
        );
        const ancestorsSchemaIdentifiers = foundJsonSchemaElement!.meta.get(
          'ancestorsSchemaIdentifiers',
        );

        assert.deepEqual(toValue(ancestorsSchemaIdentifiers), ['$id1', '$id2']);
      });
    });

    context('given JSONSchema switches dialect via parent schema', function () {
      specify('should expose ancestors schema dialect identifier as metadata', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          type: 'object',
          oneOf: [
            {
              type: 'number',
              $schema: 'schema1',
              items: { type: 'object' },
            },
          ],
          items: {
            type: 'string',
          },
        }) as JSONSchemaElement;

        assert.strictEqual(
          toValue(jsonSchemaElement.meta.get('inheritedDialectIdentifier')),
          'https://json-schema.org/draft/2019-09/schema',
        );
        assert.strictEqual(
          toValue(jsonSchemaElement.items!.meta.get('inheritedDialectIdentifier')),
          'https://json-schema.org/draft/2019-09/schema',
        );
        assert.strictEqual(
          toValue(jsonSchemaElement.oneOf!.get(0).items.meta.get('inheritedDialectIdentifier')),
          'schema1',
        );
      });
    });

    context('given $ref fields', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: { $ref: '#/json/pointer' },
          items: [{ $ref: '#/json/pointer' }],
          contains: { $ref: '#/json/pointer' },
          properties: { prop1: { $ref: '#/json/pointer' } },
          additionalProperties: { $ref: '#/json/pointer' },
          patternProperties: { '[a-z]+': { $ref: '#/json/pointer' } },
          dependentSchemas: { dep1: { $ref: '#/json/pointer' } },
          propertyNames: { $ref: '#/json/pointer' },
          if: { $ref: '#/json/pointer' },
          then: { $ref: '#/json/pointer' },
          else: { $ref: '#/json/pointer' },
          allOf: [{ $ref: '#/json/pointer' }],
          anyOf: [{ $ref: '#/json/pointer' }],
          oneOf: [{ $ref: '#/json/pointer' }],
          not: { $ref: '#/json/pointer' },
          $defs: { def1: { $ref: '#/json/pointer' } },
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });
    });

    context('given generic ApiDOM element', function () {
      let jsonSchemaElement: JSONSchemaElement;

      beforeEach(function () {
        const propertiesKeyword = new ObjectElement({}, { classes: ['example'] }, { attr: true });
        jsonSchemaElement = JSONSchemaElement.refract(
          new ObjectElement({ properties: propertiesKeyword }),
        ) as JSONSchemaElement;
      });

      specify('should refract to semantic ApiDOM tree', function () {
        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });

      specify('should deepmerge meta', function () {
        assert.deepEqual(toValue(jsonSchemaElement.properties!.meta), {
          classes: ['json-schema-properties', 'example'],
        });
      });

      specify('should deepmerge attributes', function () {
        assert.isTrue(jsonSchemaElement.properties!.attributes.get('attr').equals(true));
      });
    });
  });
});
