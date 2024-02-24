import { assert, expect } from 'chai';
import { ObjectElement, sexprs, toValue } from '@swagger-api/apidom-core';

import { JSONSchemaElement } from '../../../../src';

describe('refractor', function () {
  context('elements', function () {
    context('JSONSchema', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          $id: 'http://x.y.z/rootschema.json#',
          $schema: 'http://json-schema.org/draft-07/schema#',
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
          dependencies: { dep1: {} },
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
          definitions: { def1: {} },
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
          dependencies: { dep1: ['string1', 'string2'] },
          propertyNames: true,
          type: ['string', 'number'],
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
          dependencies: { dep1: false },
          propertyNames: true,
          if: true,
          then: false,
          else: true,
          allOf: [true],
          anyOf: [true],
          oneOf: [false],
          not: false,
          definitions: { def1: true },
        });

        expect(jsonSchemaElement).toMatchSnapshot();
      });
    });

    context('given fields of type JSONReference', function () {
      specify('should refract to semantic ApiDOM tree', function () {
        const jsonSchemaElement = JSONSchemaElement.refract({
          additionalItems: { $ref: '#/json/pointer' },
          items: [{ $ref: '#/json/pointer' }],
          contains: { $ref: '#/json/pointer' },
          properties: { prop1: { $ref: '#/json/pointer' } },
          additionalProperties: { $ref: '#/json/pointer' },
          patternProperties: { '[a-z]+': { $ref: '#/json/pointer' } },
          dependencies: { dep1: { $ref: '#/json/pointer' } },
          propertyNames: { $ref: '#/json/pointer' },
          if: { $ref: '#/json/pointer' },
          then: { $ref: '#/json/pointer' },
          else: { $ref: '#/json/pointer' },
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
