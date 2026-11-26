import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { assert } from 'chai';
import { ConvertError } from '@swagger-api/apidom-converter';
import { toValue } from '@swagger-api/apidom-core';
import { parse as parseYAML } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  type DerefContext,
  Format,
  type LanguageServiceContext,
} from '../src/apidom-language-types.ts';
import { metadata } from './metadata.ts';
import { logLevel, logPerformance } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseURI = path.join(__dirname, 'fixtures', 'deref', 'root.json');

const info = { title: 'Conversion', version: '1.0.0' };

const yamlDefinition = `openapi: 3.0.3
info:
  title: Conversion
  version: 1.0.0
paths: {}
components:
  schemas:
    Pet:
      type: [string, "null"]
      const: cat
    PetRef:
      $ref: '#/components/schemas/Pet'
`;

const yamlDefinitionWithExternalRef = `openapi: 3.0.3
info:
  title: Conversion
  version: 1.0.0
paths: {}
components:
  schemas:
    Pet:
      $ref: './json-schema-2020-12/root.yaml#/$defs/Pet'
`;

describe('apidom-ls-deref-convert-json-schema', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService = getLanguageService(context);

  const deref = async (definition: object, derefContext: DerefContext = {}) => {
    const text = JSON.stringify(definition);
    const doc = TextDocument.create('foo://bar/convert.json', 'json', 0, text);

    const result = await languageService.doDeref(doc, {
      format: Format.JSON,
      baseURI,
      convertJSONSchema: true,
      ...derefContext,
    });

    return JSON.parse(result);
  };

  after(function () {
    languageService.terminate();
  });

  describe('given convertJSONSchema and an OpenAPI 3.0.3 definition', function () {
    it('converts JSON schema keywords and dereference internal', async function () {
      const { components } = await deref({
        openapi: '3.0.3',
        info,
        paths: {},
        components: {
          schemas: {
            Pet: { type: ['string', 'null'], const: 'cat' },
            PetRef: { $ref: '#/components/schemas/Pet' },
          },
        },
      });

      const converted = { type: 'string', nullable: true, enum: ['cat'] };

      assert.deepEqual(components.schemas.Pet, converted);
      assert.deepEqual(components.schemas.PetRef, converted);
    });

    it('inlines and converts a referenced JSON Schema 2020-12 file', async function () {
      const { components } = await deref({
        openapi: '3.0.3',
        info,
        paths: {},
        components: {
          schemas: {
            Pet: { $ref: './json-schema-2020-12/root.json#/$defs/Pet' },
          },
        },
      });

      const converted = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Rex' },
          kind: { enum: ['dog'] },
          tag: { type: 'string', nullable: true },
        },
      };

      assert.deepEqual(components.schemas.Pet, converted);
    });

    it('keeps refs to moved keywords resolvable', async function () {
      const { components } = await deref({
        openapi: '3.0.3',
        info,
        paths: {},
        components: {
          schemas: {
            Owner: {
              type: 'object',
              $defs: { Name: { type: 'string', minLength: 1 } },
              properties: { name: { $ref: '#/components/schemas/Owner/$defs/Name' } },
            },
          },
        },
      });

      const { Owner } = components.schemas;

      assert.notProperty(Owner, '$defs');
      assert.deepEqual(Owner['x-conversion-$defs'].Name, { type: 'string', minLength: 1 });
      assert.deepEqual(Owner.properties.name, { type: 'string', minLength: 1 });
    });

    it('rejects when conversion fails', async function () {
      try {
        await deref({
          openapi: '3.0.3',
          info,
          paths: {},
          components: {
            schemas: {
              Pet: {
                $ref: './json-schema-2020-12/root.json#missing',
              },
            },
          },
        });

        assert.fail('throws ConvertError');
      } catch (error) {
        assert.instanceOf(error, ConvertError);
      }
    });
  });

  describe('given convertJSONSchema is not set', function () {
    it('only dereferences', async function () {
      const { components } = await deref(
        {
          openapi: '3.0.3',
          info,
          paths: {},
          components: {
            schemas: {
              Pet: {
                const: 'cat',
              },
            },
          },
        },
        {
          convertJSONSchema: undefined,
        },
      );

      assert.deepEqual(components.schemas.Pet, { const: 'cat' });
    });
  });

  describe('given convertJSONSchema and an OpenAPI 3.1.0 definition', function () {
    it('leaves definition unconverted', async function () {
      const { openapi, components } = await deref({
        openapi: '3.1.0',
        info,
        paths: {},
        components: {
          schemas: {
            Pet: {
              const: 'cat',
            },
          },
        },
      });

      assert.strictEqual(openapi, '3.1.0');
      assert.deepEqual(components.schemas.Pet, { const: 'cat' });
    });
  });

  describe('given convertJSONSchema and an OpenAPI 3.0.3 YAML definition', function () {
    const derefYAML = async (definition: string) => {
      const doc = TextDocument.create('foo://bar/convert.yaml', 'yaml', 0, definition);

      const result = await languageService.doDeref(doc, {
        format: Format.YAML,
        baseURI,
        convertJSONSchema: true,
      });

      const { result: parsed } = await parseYAML(result);

      return toValue(parsed);
    };

    it('converts JSON schema keywords and serializes YAML', async function () {
      const { components } = await derefYAML(yamlDefinition);
      const converted = { type: 'string', nullable: true, enum: ['cat'] };

      assert.deepEqual(components.schemas.Pet, converted);
      assert.deepEqual(components.schemas.PetRef, converted);
    });

    it('inlines and converts a referenced JSON schema 2020-12 YAML file', async function () {
      const { components } = await derefYAML(yamlDefinitionWithExternalRef);

      const converted = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Rex' },
          tag: { type: 'string', nullable: true },
          kind: { enum: ['dog'] },
        },
      };

      assert.deepEqual(components.schemas.Pet, converted);
    });
  });
});
