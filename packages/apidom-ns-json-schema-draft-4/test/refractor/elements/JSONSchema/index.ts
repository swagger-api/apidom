import { assert, expect } from 'chai';
import { ObjectElement, sexprs, toValue, find, isElement } from '@swagger-api/apidom-core';

import { JSONSchemaElement, isJSONSchemaElement } from '../../../../src/index.ts';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchema', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
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
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });
    });

    context('JSONSchema with alternate field values', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: true,
          items: {},
          additionalProperties: true,
          dependencies: { dep1: ['string1', 'string2'] },
          type: ['string', 'number'],
        });

        expect(sexprs(jsonSchemaElement)).toMatchSnapshot();
      });
    });

    context('given JSONSchema ancestors are embedded resources', function () {
      specify('should expose ancestors schema identifiers as metadata', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          type: 'array',
          oneOf: [
            {
              id: 'id1',
              type: 'number',
              items: { id: 'id2', type: 'object' },
            },
          ],
          items: {
            type: 'string',
          },
        });
        const foundJsonSchemaElement = find(
          (e) => isJSONSchemaElement(e) && isElement(e.get('id')) && e.get('id').equals('id2'),
          jsonSchemaElement,
        );
        const ancestorsSchemaIdentifiers = foundJsonSchemaElement!.meta.get(
          'ancestorsSchemaIdentifiers',
        );

        assert.deepEqual(toValue(ancestorsSchemaIdentifiers), ['id1', 'id2']);
      });
    });

    context('given JSONSchema switches dialect via parent schema', function () {
      specify('should expose ancestors schema dialect identifier as metadata', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          id: '1',
          type: 'object',
          oneOf: [
            {
              id: '2',
              type: 'number',
              $schema: 'schema1',
              items: { id: '3', type: 'object' },
            },
          ],
          items: {
            $id: '4',
            type: 'string',
          },
        }) as JSONSchemaElement;

        assert.strictEqual(
          toValue(jsonSchemaElement.meta.get('inheritedDialectIdentifier')),
          'http://json-schema.org/draft-04/schema#',
        );
        assert.strictEqual(
          toValue(jsonSchemaElement.items!.meta.get('inheritedDialectIdentifier')),
          'http://json-schema.org/draft-04/schema#',
        );
        assert.strictEqual(
          toValue(jsonSchemaElement.oneOf!.get(0).items.meta.get('inheritedDialectIdentifier')),
          'schema1',
        );
      });
    });

    context('given fields of type JSONReference', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: { $ref: '#/json/pointer' },
          items: [{ $ref: '#/json/pointer' }],
          properties: { prop1: { $ref: '#/json/pointer' } },
          additionalProperties: { $ref: '#/json/pointer' },
          patternProperties: { '[a-z]+': { $ref: '#/json/pointer' } },
          dependencies: { dep1: { $ref: '#/json/pointer' } },
          allOf: [{ $ref: '#/json/pointer' }],
          anyOf: [{ $ref: '#/json/pointer' }],
          oneOf: [{ $ref: '#/json/pointer' }],
          not: { $ref: '#/json/pointer' },
          definitions: { def1: { $ref: '#/json/pointer' } },
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
