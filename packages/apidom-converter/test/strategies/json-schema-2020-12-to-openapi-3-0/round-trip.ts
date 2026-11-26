import { assert } from 'chai';
import { ObjectElement, cloneDeep, toValue } from '@swagger-api/apidom-core';
import { SchemaElement as SchemaElement30 } from '@swagger-api/apidom-ns-openapi-3-0';
import { SchemaElement as SchemaElement31 } from '@swagger-api/apidom-ns-openapi-3-1';
import { JSONSchemaElement, isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

/**
 * The downgrader refracts schemas to JSON Schema 2020-12 to run its rules and refracts them back
 * to OpenAPI 3.0. These tests pin down that the round trip loses nothing.
 */
describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('refract round trip', function () {
        context('given an OpenAPI 3.0 Schema Object', function () {
          const input = {
            type: 'object',
            nullable: true,
            example: { id: 1 },
            discriminator: { propertyName: 'kind', mapping: { a: '#/components/schemas/A' } },
            xml: { name: 'pet', wrapped: true },
            readOnly: true,
            writeOnly: false,
            deprecated: true,
            externalDocs: { url: 'https://example.com' },
            'x-vendor': { keep: 'me' },
            required: ['id'],
            properties: {
              id: { type: 'integer', minimum: 0, exclusiveMinimum: true, example: 10 },
              tags: { type: 'array', items: { type: 'string', nullable: true } },
              tuple: { prefixItems: [{ type: 'string', const: 'x' }, { $ref: '#/$defs/N' }] },
              ref: { $ref: '#/components/schemas/Other' },
            },
            allOf: [{ $ref: '#/components/schemas/Base' }],
            $defs: { N: { type: 'number', examples: [1, 2] } },
          };
          const schema30: any = SchemaElement30.refract(new ObjectElement(input));
          schema30.get('properties').get('id').setMetaProperty('marker', 'id-meta');
          const schema2020: any = JSONSchemaElement.refract(cloneDeep(schema30));
          const back: any = SchemaElement30.refract(cloneDeep(schema2020));

          specify('should refract to JSON Schema 2020-12 without losing values', function () {
            assert.isTrue(isJSONSchemaElement(schema2020));
            assert.deepEqual(toValue(schema2020), toValue(schema30));
          });

          specify('should expose schemas nested in 2020-12 keywords', function () {
            const tuple = schema2020.get('properties').get('tuple');

            assert.isTrue(isJSONSchemaElement(tuple.get('prefixItems').get(0)));
            assert.isTrue(isJSONSchemaElement(schema2020.get('$defs').get('N')));
          });

          specify('should refract back to OpenAPI 3.0 without losing values', function () {
            assert.deepEqual(toValue(back), toValue(schema30));
          });

          specify('should keep meta of nested elements', function () {
            const marker = back.get('properties').get('id').meta.get('marker');

            assert.strictEqual(toValue(marker), 'id-meta');
          });

          specify('should restore OpenAPI 3.0 element types', function () {
            assert.strictEqual(back.get('properties').get('tags').element, 'schema');
            assert.strictEqual(back.get('discriminator').element, 'discriminator');
            assert.strictEqual(back.get('properties').get('ref').element, 'reference');
          });
        });

        context('given an OpenAPI 3.1 Schema Object', function () {
          const input = {
            type: ['string', 'null'],
            examples: ['a'],
            discriminator: { propertyName: 'k' },
            xml: { name: 'x' },
            externalDocs: { url: 'https://example.com' },
            'x-vendor': 1,
            $defs: { D: { const: 1 } },
            prefixItems: [{ type: 'integer' }],
            properties: { p: { $ref: '#/$defs/D', description: 'sibling' } },
          };
          const schema31: any = SchemaElement31.refract(new ObjectElement(input));
          schema31.get('properties').get('p').setMetaProperty('marker', 'p-meta');
          const schema2020: any = JSONSchemaElement.refract(cloneDeep(schema31));
          const schema30: any = SchemaElement30.refract(cloneDeep(schema2020));

          specify('should refract to JSON Schema 2020-12 without losing values', function () {
            assert.deepEqual(toValue(schema2020), toValue(schema31));
            assert.isTrue(isJSONSchemaElement(schema2020.get('$defs').get('D')));
            assert.isTrue(isJSONSchemaElement(schema2020.get('prefixItems').get(0)));
          });

          specify('should keep a $ref with siblings as one schema', function () {
            assert.isTrue(isJSONSchemaElement(schema2020.get('properties').get('p')));
          });

          specify('should refract to OpenAPI 3.0 without losing values or meta', function () {
            const marker = schema30.get('properties').get('p').meta.get('marker');

            assert.deepEqual(toValue(schema30), toValue(schema31));
            assert.strictEqual(toValue(marker), 'p-meta');
            assert.strictEqual(schema30.get('discriminator').element, 'discriminator');
          });
        });
      });
    });
  });
});
