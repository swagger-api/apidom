import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import AjvDraft04Module from 'ajv-draft-04';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import { mediaTypes as openAPI30MediaTypes } from '@swagger-api/apidom-ns-openapi-3-0';

import convert from '../../../src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtures = path.join(__dirname, 'fixtures');
const e2e = path.join(fixtures, 'e2e');
const target = openAPI30MediaTypes.findBy('3.0.3', 'json');

const AjvDraft04 = (AjvDraft04Module as any).default ?? AjvDraft04Module;
const oasSchema = JSON.parse(
  fs.readFileSync(path.join(fixtures, 'oas-3.0-schema-2021-09-28.json'), 'utf8'),
);
const validateOAS = new AjvDraft04({ strict: false, validateFormats: false }).compile(oasSchema);

const VALIDATION_KEYWORDS = new Set([
  'type',
  'enum',
  'const',
  'properties',
  'items',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
  'required',
  'additionalProperties',
  'minimum',
  'maximum',
  'minLength',
  'maxLength',
  'pattern',
  'format',
  'minItems',
  'maxItems',
  'minProperties',
  'maxProperties',
  'nullable',
]);

const pointerTarget = (document: any, ref: string): unknown =>
  ref
    .slice(2)
    .split('/')
    .filter((token) => token !== '')
    .map((token) => decodeURIComponent(token).replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce(
      (current: any, token) => (current === undefined ? undefined : current[token]),
      document,
    );

/**
 * Asserts the conversion invariants on a converted document: valid against the official OpenAPI
 * 3.0 schema, every internal `$ref` resolves, and no `$ref` keeps validation siblings.
 */
const assertConverted = (document: any): void => {
  const valid = validateOAS(document);
  assert.isTrue(valid, JSON.stringify(validateOAS.errors?.slice(0, 5)));

  const visit = (value: unknown, location: string) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${location}/${index}`));
      return;
    }
    if (value === null || typeof value !== 'object') return;
    const object = value as Record<string, unknown>;
    if (typeof object.$ref === 'string') {
      if (object.$ref.startsWith('#')) {
        assert.isDefined(pointerTarget(document, object.$ref), `${location}: ${object.$ref}`);
      }
      const siblings = Object.keys(object).filter((key) => VALIDATION_KEYWORDS.has(key));
      assert.deepEqual(siblings, [], `${location}: $ref with validation siblings`);
    }
    Object.entries(object).forEach(([key, item]) => visit(item, `${location}/${key}`));
  };
  visit(document, '#');
};

const swaggerClientReplacer = (refElement: any) => {
  const ref = String(toValue(refElement.meta.get('$ref')));
  const uri = String(toValue(refElement.meta.get('uri')));
  return new ObjectElement({ $ref: `${uri}${ref.slice(ref.indexOf('#'))}` });
};

const convertFile = async (file: string, options: Record<string, unknown> = {}) => {
  const result: any = await convert(file, { convert: { targetMediaType: target }, ...options });
  return { document: toValue(result.api) as any, result };
};

const assertIdempotent = async (document: unknown): Promise<void> => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'apidom-converter-'));
  const file = path.join(directory, 'converted.json');
  fs.writeFileSync(file, JSON.stringify(document));
  try {
    const again = await convertFile(file);
    assert.deepEqual(again.document, document);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
};

describe('converter', function () {
  context('strategies', function () {
    context('json-schema-2020-12-to-openapi-3-0', function () {
      context('end to end', function () {
        context(
          'given an OpenAPI 3.0.0 Petstore referencing a JSON Schema 2020-12 file',
          function () {
            specify(
              'should produce a valid, fully converted OpenAPI 3.0 document',
              async function () {
                const { document } = await convertFile(path.join(e2e, 'petstore.yaml'), {
                  dereference: { circular: 'replace', circularReplacer: swaggerClientReplacer },
                });

                assertConverted(document);
                assert.strictEqual(document.openapi, '3.0.3');
                assert.deepEqual(document.components.schemas.Category.properties.id, {
                  type: 'integer',
                  format: 'int64',
                  example: 1,
                });
                assert.notInclude(
                  JSON.stringify(document),
                  'json-schema-2020-12.yaml#/$defs/Category',
                );
              },
            );
          },
        );

        context('given a Draft 4 file with keywords OpenAPI 3.0 forbids', function () {
          specify('should produce a valid OpenAPI 3.0 document', async function () {
            const { document } = await convertFile(path.join(e2e, 'draft4-entry.json'));
            const legacy = document.components.schemas.Legacy;

            assertConverted(document);
            assert.deepEqual(legacy.properties.kind, { type: 'string', nullable: true });
            assert.deepEqual(legacy.properties.nothing, {
              type: 'string',
              nullable: true,
              enum: [null],
            });
            assert.property(legacy, 'x-conversion-patternProperties');
            assert.property(legacy, 'x-conversion-definitions');
            assert.property(legacy.properties.tuple, 'x-conversion-items');
            assert.notProperty(legacy, 'id');
            await assertIdempotent(document);
          });
        });

        context('given external Path Item and Parameter references', function () {
          specify('should inline them and convert their schemas', async function () {
            const { document } = await convertFile(path.join(e2e, 'objects-entry.yaml'));
            const items = document.paths['/items'].get.responses['200'].content['application/json'];
            const limit = document.paths['/search'].get.parameters[0];

            assertConverted(document);
            assert.deepEqual(items.schema.items, { type: 'string', nullable: true, example: 'a' });
            assert.deepEqual(limit.schema, {
              type: 'integer',
              minimum: 0,
              exclusiveMinimum: true,
              enum: [10],
            });
            await assertIdempotent(document);
          });
        });

        context('given a document whose conversions are all lossless', function () {
          specify('should convert it without warnings', async function () {
            const { document, result } = await convertFile(path.join(fixtures, 'root-only.json'));

            assertConverted(document);
            assert.deepEqual(document.components.schemas.Plain, {
              $ref: '#/components/schemas/Other',
              description: 'kept as is',
            });
            assert.lengthOf(result.annotations, 0);
          });
        });

        context('invariant check', function () {
          specify('should reject an unconverted document', function () {
            const unconverted = {
              openapi: '3.0.3',
              info: { title: 'x', version: '1' },
              paths: {},
              components: { schemas: { A: { const: 1 }, B: { $ref: '#/missing' } } },
            };

            assert.throws(() => assertConverted(unconverted));
          });
        });
      });
    });
  });
});
