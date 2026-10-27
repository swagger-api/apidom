import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, Position } from 'vscode-languageserver-types';
import { fileURLToPath } from 'node:url';
import {
  createRefractor,
  JSONSchemaElement as JSONSchema202012Element,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

import { createHTTPServer, ServerTerminable } from './helpers.ts';
import getLanguageService from '../src/apidom-language-service.ts';
import {
  ContentLanguage,
  Format,
  LanguageService,
  LanguageServiceContext,
  ReferenceValidationMode,
  ValidationContext,
} from '../src/apidom-language-types.ts';
import { parse } from '../src/parser-factory.ts';
import { findNamespace, getSpecVersion } from '../src/utils/utils.ts';
import { metadata } from './metadata.ts';
import { logLevel, logPerformance } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesPath = path.join(__dirname, 'fixtures', 'json-schema-2020-12');
const fixture = (name: string) => fs.readFileSync(path.join(fixturesPath, name)).toString();

const jsonContentLanguage: ContentLanguage = {
  namespace: 'json-schema',
  version: '2020-12',
  format: 'JSON',
  admitsRefsSiblings: true,
  mediaType: 'application/schema+json;version=2020-12',
};
const yamlContentLanguage: ContentLanguage = {
  namespace: 'json-schema',
  version: '2020-12',
  format: 'YAML',
  admitsRefsSiblings: true,
  mediaType: 'application/schema+yaml;version=2020-12',
};

const keywords = [
  '$anchor',
  '$comment',
  '$defs',
  '$dynamicAnchor',
  '$dynamicRef',
  '$id',
  '$ref',
  '$schema',
  '$vocabulary',
  'additionalProperties',
  'allOf',
  'anyOf',
  'base',
  'const',
  'contains',
  'contentEncoding',
  'contentMediaType',
  'contentSchema',
  'default',
  'dependentRequired',
  'dependentSchemas',
  'deprecated',
  'description',
  'else',
  'enum',
  'examples',
  'exclusiveMaximum',
  'exclusiveMinimum',
  'format',
  'if',
  'items',
  'links',
  'maxContains',
  'maxItems',
  'maxLength',
  'maxProperties',
  'maximum',
  'minContains',
  'minItems',
  'minLength',
  'minProperties',
  'minimum',
  'multipleOf',
  'not',
  'oneOf',
  'pattern',
  'patternProperties',
  'prefixItems',
  'properties',
  'propertyNames',
  'readOnly',
  'required',
  'then',
  'title',
  'type',
  'unevaluatedItems',
  'unevaluatedProperties',
  'uniqueItems',
  'writeOnly',
];

type DecodedToken = [line: number, character: number, length: number, type: string];

const decodeTokens = (data: number[], tokenTypes: string[]): DecodedToken[] => {
  const decoded: DecodedToken[] = [];
  let line = 0;
  let character = 0;
  for (let i = 0; i < data.length; i += 5) {
    line += data[i];
    character = data[i] === 0 ? character + data[i + 1] : data[i + 1];
    decoded.push([line, character, data[i + 2], tokenTypes[data[i + 3]]]);
  }
  return decoded;
};

describe('apidom-ls-json-schema-2020-12', function () {
  const lsContext: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  };

  let languageService: LanguageService;

  beforeEach(function () {
    languageService = getLanguageService(lsContext);
  });

  afterEach(function () {
    languageService.terminate();
  });

  context('detection', function () {
    specify('should detect a document with a root $schema 2020-12 in JSON', async function () {
      const doc = TextDocument.create('foo://bar/valid.json', 'json', 0, fixture('valid.json'));

      assert.deepEqual(await findNamespace(doc), jsonContentLanguage);

      const result = await parse(doc, metadata().metadataMaps);
      assert.strictEqual(result.api?.element, 'JSONSchema202012');
      assert.includeMembers(result.api?.classes.toValue(), ['result', 'api']);
      assert.strictEqual(getSpecVersion(result.api!), '2020-12');
    });

    specify('should detect a document with a root $schema 2020-12 in YAML', async function () {
      const doc = TextDocument.create('foo://bar/valid.yaml', 'yaml', 0, fixture('valid.yaml'));

      assert.deepEqual(await findNamespace(doc), yamlContentLanguage);

      const result = await parse(doc, metadata().metadataMaps);
      assert.strictEqual(result.api?.element, 'JSONSchema202012');
      assert.includeMembers(result.api?.classes.toValue(), ['result', 'api']);
      assert.strictEqual(getSpecVersion(result.api!), '2020-12');
    });

    specify('should detect a root $schema that follows a nested one in JSON', async function () {
      const text = JSON.stringify({
        $defs: { a: { $schema: 'https://json-schema.org/draft/2020-12/schema' } },
        $schema: 'https://json-schema.org/draft/2020-12/schema',
      });

      assert.deepEqual(await findNamespace(text), jsonContentLanguage);
    });

    specify('should detect a root $schema that follows a nested one in YAML', async function () {
      const text = [
        '$defs:',
        '  a:',
        '    $schema: https://json-schema.org/draft/2020-12/schema',
        '"$schema": "https://json-schema.org/draft/2020-12/schema"',
      ].join('\n');

      assert.deepEqual(await findNamespace(text), yamlContentLanguage);
    });

    specify('should not detect a document whose only $schema is nested in JSON', async function () {
      const text = JSON.stringify({
        type: 'object',
        properties: { a: { $schema: 'https://json-schema.org/draft/2020-12/schema' } },
      });

      assert.deepEqual(await findNamespace(text), {
        namespace: 'apidom',
        format: 'JSON',
        mediaType: 'application/json',
      });
    });

    specify('should not detect a document whose only $schema is nested in YAML', async function () {
      const text = [
        'type: object',
        'properties:',
        '  a:',
        '    $schema: https://json-schema.org/draft/2020-12/schema',
      ].join('\n');

      assert.deepEqual(await findNamespace(text), {
        namespace: 'apidom',
        format: 'YAML',
        mediaType: 'application/yaml',
      });
    });

    specify('should not detect a $schema 2020-12 inside a string value', async function () {
      const text = JSON.stringify({
        description: '"$schema": "https://json-schema.org/draft/2020-12/schema"',
      });

      assert.deepEqual((await findNamespace(text)).namespace, 'apidom');
    });

    specify('should detect a root $schema with an empty fragment in JSON', async function () {
      const text = JSON.stringify({
        $schema: 'https://json-schema.org/draft/2020-12/schema#',
        type: 'object',
      });
      const result = await parse(text, metadata().metadataMaps);

      assert.deepEqual(await findNamespace(text), jsonContentLanguage);
      assert.strictEqual(result.api?.element, 'JSONSchema202012');
    });

    specify('should detect a root $schema with an empty fragment in YAML', async function () {
      const quotes = ['', "'", '"'];

      for (const quote of quotes) {
        const text = [
          `$schema: ${quote}https://json-schema.org/draft/2020-12/schema#${quote}`,
          'type: object',
        ].join('\n');
        // eslint-disable-next-line no-await-in-loop
        const result = await parse(text, metadata().metadataMaps);

        // eslint-disable-next-line no-await-in-loop
        assert.deepEqual(await findNamespace(text), yamlContentLanguage);
        assert.strictEqual(result.api?.element, 'JSONSchema202012');
      }
    });

    specify(
      'should not detect a root $schema with another fragment or the http scheme in JSON',
      async function () {
        const identifiers = [
          'https://json-schema.org/draft/2020-12/schema#/x',
          'https://json-schema.org/draft/2020-12/schema##',
          'http://json-schema.org/draft/2020-12/schema#',
        ];

        for (const $schema of identifiers) {
          // eslint-disable-next-line no-await-in-loop
          assert.deepEqual(await findNamespace(JSON.stringify({ $schema, type: 'object' })), {
            namespace: 'apidom',
            format: 'JSON',
            mediaType: 'application/json',
          });
        }
      },
    );

    specify(
      'should not detect a root $schema with another fragment or the http scheme in YAML',
      async function () {
        const identifiers = [
          'https://json-schema.org/draft/2020-12/schema#/x',
          'https://json-schema.org/draft/2020-12/schema##',
          "'https://json-schema.org/draft/2020-12/schema#/x'",
          'http://json-schema.org/draft/2020-12/schema#',
        ];

        for (const $schema of identifiers) {
          // eslint-disable-next-line no-await-in-loop
          assert.deepEqual(await findNamespace(`$schema: ${$schema}\ntype: object`), {
            namespace: 'apidom',
            format: 'YAML',
            mediaType: 'application/yaml',
          });
        }
      },
    );

    specify(
      'should not detect an API description with a root $schema with an empty fragment',
      async function () {
        const $schema = 'https://json-schema.org/draft/2020-12/schema#';

        assert.strictEqual(
          (await findNamespace(JSON.stringify({ openapi: '3.3.0', $schema }))).namespace,
          'apidom',
        );
        assert.strictEqual(
          (await findNamespace(`arazzo: 1.0.1\n$schema: ${$schema}`)).namespace,
          'apidom',
        );
      },
    );

    [
      ['an Arazzo 1.0.1', 'arazzo', '1.0.1'],
      ['an AsyncAPI', 'asyncapi', '9.0.0'],
      ['an OpenAPI', 'openapi', '3.3.0'],
      ['a Swagger', 'swagger', '9.0'],
    ].forEach(([title, field, version]) => {
      specify(
        `should not detect ${title} document with an undetected ${field} version and a root $schema in JSON`,
        async function () {
          const text = JSON.stringify({
            [field]: version,
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            type: 'object',
          });

          assert.deepEqual(await findNamespace(text), {
            namespace: 'apidom',
            format: 'JSON',
            mediaType: 'application/json',
          });
        },
      );

      specify(
        `should not detect ${title} document with an undetected ${field} version and a root $schema in YAML`,
        async function () {
          const text = [
            '$schema: https://json-schema.org/draft/2020-12/schema',
            `${field}: ${version}`,
            'type: object',
          ].join('\n');

          assert.deepEqual(await findNamespace(text), {
            namespace: 'apidom',
            format: 'YAML',
            mediaType: 'application/yaml',
          });
        },
      );
    });

    ['3.1.0', '3.2.0'].forEach((version) => {
      const schemas = {
        User: {
          $schema: 'https://json-schema.org/draft/2020-12/schema',
          type: 'object',
        },
      };
      const document = {
        openapi: version,
        info: { title: 'Users', version: '1.0.0' },
        paths: {},
        components: { schemas },
      };

      specify(
        `should detect OpenAPI ${version} documents whose schemas carry $schema as OpenAPI in JSON`,
        async function () {
          const doc = TextDocument.create(
            'foo://bar/openapi.json',
            'json',
            0,
            JSON.stringify(document, null, 2),
          );
          const result = await parse(doc, metadata().metadataMaps);

          assert.deepEqual(await findNamespace(doc), {
            namespace: 'openapi',
            version,
            format: 'JSON',
            admitsRefsSiblings: true,
            mediaType: `application/vnd.oai.openapi+json;version=${version}`,
          });
          assert.strictEqual(
            result.api?.element,
            `openApi${version.slice(0, 3).replace('.', '_')}`,
          );
        },
      );

      specify(
        `should detect OpenAPI ${version} documents whose schemas carry $schema as OpenAPI in YAML`,
        async function () {
          const text = [
            `openapi: ${version}`,
            'info:',
            '  title: Users',
            '  version: 1.0.0',
            'paths: {}',
            'components:',
            '  schemas:',
            '    User:',
            '      $schema: https://json-schema.org/draft/2020-12/schema',
            '      type: object',
          ].join('\n');
          const doc = TextDocument.create('foo://bar/openapi.yaml', 'yaml', 0, text);
          const result = await parse(doc, metadata().metadataMaps);

          assert.deepEqual(await findNamespace(doc), {
            namespace: 'openapi',
            version,
            format: 'YAML',
            admitsRefsSiblings: true,
            mediaType: `application/vnd.oai.openapi+yaml;version=${version}`,
          });
          assert.strictEqual(
            result.api?.element,
            `openApi${version.slice(0, 3).replace('.', '_')}`,
          );
        },
      );
    });
  });

  context('validation', function () {
    specify('should report invalid keyword values in JSON', async function () {
      const doc = TextDocument.create(
        'foo://bar/invalid-keywords.json',
        'json',
        0,
        fixture('invalid-keywords.json'),
      );

      const result = await languageService.doValidation(doc);
      const expected: Diagnostic[] = [
        {
          range: { start: { line: 2, character: 13 }, end: { line: 2, character: 18 } },
          message:
            "'$anchor' must start with a letter or underscore, followed by letters, digits, hyphens, underscores or periods",
          severity: 1,
          code: 8030501,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 9, character: 2 }, end: { line: 9, character: 9 } },
          message: "'allOf' must be a non-empty array of JSON Schemas",
          severity: 1,
          code: 8032100,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 3, character: 10 }, end: { line: 3, character: 18 } },
          message:
            "'type' must be one of allowed values: array, boolean, integer, null, number, object, string",
          severity: 1,
          code: 8032700,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 4, character: 2 }, end: { line: 4, character: 12 } },
          message: "'required' must be an array of strings",
          severity: 1,
          code: 8034400,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 6, character: 45 }, end: { line: 6, character: 47 } },
          message: "'minLength' must be a non-negative integer",
          severity: 1,
          code: 8033500,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 7, character: 40 }, end: { line: 7, character: 62 } },
          message: "'items' must be a JSON Schema",
          severity: 1,
          code: 8031100,
          source: 'apilint',
          data: {},
        },
      ];

      assert.deepEqual(result, expected);
    });

    specify('should report invalid keyword values in YAML', async function () {
      const doc = TextDocument.create(
        'foo://bar/invalid-keywords.yaml',
        'yaml',
        0,
        fixture('invalid-keywords.yaml'),
      );

      const result = await languageService.doValidation(doc);
      const expected: Diagnostic[] = [
        {
          range: { start: { line: 1, character: 9 }, end: { line: 1, character: 12 } },
          message:
            "'$anchor' must start with a letter or underscore, followed by letters, digits, hyphens, underscores or periods",
          severity: 1,
          code: 8030501,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 12, character: 0 }, end: { line: 12, character: 5 } },
          message: "'allOf' must be a non-empty array of JSON Schemas",
          severity: 1,
          code: 8032100,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 2, character: 6 }, end: { line: 2, character: 12 } },
          message:
            "'type' must be one of allowed values: array, boolean, integer, null, number, object, string",
          severity: 1,
          code: 8032700,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 3, character: 0 }, end: { line: 3, character: 8 } },
          message: "'required' must be an array of strings",
          severity: 1,
          code: 8034400,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 7, character: 15 }, end: { line: 7, character: 17 } },
          message: "'minLength' must be a non-negative integer",
          severity: 1,
          code: 8033500,
          source: 'apilint',
          data: {},
        },
        {
          range: { start: { line: 11, character: 6 }, end: { line: 11, character: 20 } },
          message: "'items' must be a JSON Schema",
          severity: 1,
          code: 8031100,
          source: 'apilint',
          data: {},
        },
      ];

      assert.deepEqual(result, expected);
    });

    specify('should report nothing for a valid document in JSON', async function () {
      const doc = TextDocument.create('foo://bar/valid.json', 'json', 0, fixture('valid.json'));

      assert.deepEqual(await languageService.doValidation(doc), []);
    });

    specify('should report nothing for a valid document in YAML', async function () {
      const doc = TextDocument.create('foo://bar/valid.yaml', 'yaml', 0, fixture('valid.yaml'));

      assert.deepEqual(await languageService.doValidation(doc), []);
    });
  });

  context('keyword rules', function () {
    const validate = async (schema: Record<string, unknown>) => {
      const text = JSON.stringify(
        { $schema: 'https://json-schema.org/draft/2020-12/schema', ...schema },
        null,
        2,
      );
      const doc = TextDocument.create('foo://bar/schema.json', 'json', 0, text);
      return languageService.doValidation(doc);
    };

    specify('should report duplicate required properties', async function () {
      assert.deepEqual(await validate({ required: ['name', 'name'] }), [
        {
          range: { start: { line: 2, character: 2 }, end: { line: 2, character: 12 } },
          message: "'required' must be an array with unique items",
          severity: 1,
          code: 8034401,
          source: 'apilint',
          data: {},
        },
      ]);
    });

    specify(
      'should report dependentRequired values that are not arrays of unique strings',
      async function () {
        assert.deepEqual(await validate({ dependentRequired: { a: [1, true], b: ['c', 'c'] } }), [
          {
            range: { start: { line: 2, character: 2 }, end: { line: 2, character: 21 } },
            message: "'dependentRequired' values must be arrays of strings",
            severity: 1,
            code: 8034501,
            source: 'apilint',
            data: {},
          },
          {
            range: { start: { line: 2, character: 2 }, end: { line: 2, character: 21 } },
            message: "'dependentRequired' values must be arrays with unique items",
            severity: 1,
            code: 8034502,
            source: 'apilint',
            data: {},
          },
        ]);
      },
    );

    specify(
      'should warn about a pattern that is not a valid regular expression',
      async function () {
        assert.deepEqual(await validate({ pattern: '[' }), [
          {
            range: { start: { line: 2, character: 13 }, end: { line: 2, character: 16 } },
            message: "'pattern' should be a valid regular expression",
            severity: 2,
            code: 8033601,
            source: 'apilint',
            data: {},
          },
        ]);
      },
    );

    specify(
      'should warn about patternProperties keys that are not valid regular expressions',
      async function () {
        assert.deepEqual(await validate({ patternProperties: { '[': {}, '^a': {} } }), [
          {
            range: { start: { line: 2, character: 2 }, end: { line: 2, character: 21 } },
            message: "'patternProperties' keys should be valid regular expressions",
            severity: 2,
            code: 8031502,
            source: 'apilint',
            data: {},
          },
        ]);
      },
    );

    /**
     * F6: apidom-ns-arazzo-1, loaded with apidom-reference, assigns its refractor to the JSON Schema
     * 2020-12 element class, and the Arazzo specification lacks LinkDescription, so a document with
     * `links` fails to parse until fix/ns-arazzo-1-link-description is merged. This test restores
     * the JSON Schema 2020-12 refractor meanwhile; drop that once the fix is merged.
     */
    specify(
      'should report invalid rel values and duplicate templateRequired items in Link Description Objects',
      async function () {
        const { refract } = JSONSchema202012Element;
        JSONSchema202012Element.refract = createRefractor([
          'visitors',
          'document',
          'objects',
          'JSONSchema',
          '$visitor',
        ]);

        try {
          const result = await validate({
            links: [
              { rel: [], href: '/a' },
              { rel: [1], href: '/b' },
              { rel: 5, href: '/c', templateRequired: ['id', 'id'] },
            ],
          });

          assert.deepEqual(result, [
            {
              range: { start: { line: 4, character: 6 }, end: { line: 4, character: 11 } },
              message: "'rel' must be a non-empty array of strings",
              severity: 1,
              code: 8040302,
              source: 'apilint',
              data: {},
            },
            {
              range: { start: { line: 8, character: 6 }, end: { line: 8, character: 11 } },
              message: "'rel' must be a non-empty array of strings",
              severity: 1,
              code: 8040302,
              source: 'apilint',
              data: {},
            },
            {
              range: { start: { line: 14, character: 13 }, end: { line: 14, character: 14 } },
              message: "'rel' must be a string or a non-empty array of strings",
              severity: 1,
              code: 8040300,
              source: 'apilint',
              data: {},
            },
            {
              range: { start: { line: 16, character: 6 }, end: { line: 16, character: 24 } },
              message: "'templateRequired' must be an array with unique items",
              severity: 1,
              code: 8040701,
              source: 'apilint',
              data: {},
            },
          ]);
        } finally {
          JSONSchema202012Element.refract = refract;
        }
      },
    );
  });

  context('references', function () {
    const httpPort = 8127;
    let httpServer: ServerTerminable;

    beforeEach(function () {
      httpServer = createHTTPServer({ port: httpPort, cwd: path.join(fixturesPath, 'external') });
    });

    afterEach(async function () {
      await httpServer.terminate();
    });

    const withCodeNormalized = (diagnostics: Diagnostic[]) =>
      diagnostics.map((diagnostic) => ({ ...diagnostic, code: 'test' }));

    const expectedJSON: Diagnostic[] = [
      {
        range: { start: { line: 6, character: 25 }, end: { line: 6, character: 42 } },
        message:
          'Reference Error - JSONPointerKeyError: Invalid object key "missing" at position 1 in "/$defs/missing": key not found in object',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: { quickFix: [] },
      },
      {
        range: { start: { line: 8, character: 23 }, end: { line: 8, character: 59 } },
        message: 'Reference Error - AxiosError: Request failed with status code 404',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: { quickFix: [] },
      },
    ];

    const expectedYAML: Diagnostic[] = [
      {
        range: { start: { line: 8, character: 10 }, end: { line: 8, character: 27 } },
        message:
          'Reference Error - JSONPointerKeyError: Invalid object key "missing" at position 1 in "/$defs/missing": key not found in object',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: { quickFix: [] },
      },
      {
        range: { start: { line: 12, character: 10 }, end: { line: 12, character: 44 } },
        message: 'Reference Error - AxiosError: Request failed with status code 404',
        severity: 1,
        code: 'test',
        source: 'apilint',
        data: { quickFix: [] },
      },
    ];

    [false, true].forEach((continueOnError) => {
      const mode = continueOnError ? ' with continue on error' : '';
      const validationContext: ValidationContext = {
        comments: DiagnosticSeverity.Error,
        maxNumberOfProblems: 100,
        relatedInformation: false,
        referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
        referenceValidationContinueOnError: continueOnError,
      };

      specify(
        `should report unresolvable internal and external $refs in JSON${mode}`,
        async function () {
          this.timeout(10000);
          const doc = TextDocument.create(
            'foo://bar/references.json',
            'json',
            0,
            fixture('references.json'),
          );

          const result = await languageService.doValidation(doc, validationContext);

          assert.deepEqual(withCodeNormalized(result), expectedJSON);
        },
      );

      specify(
        `should report unresolvable internal and external $refs in YAML${mode}`,
        async function () {
          this.timeout(10000);
          const doc = TextDocument.create(
            'foo://bar/references.yaml',
            'yaml',
            0,
            fixture('references.yaml'),
          );

          const result = await languageService.doValidation(doc, validationContext);

          assert.deepEqual(withCodeNormalized(result), expectedYAML);
        },
      );
    });

    specify('should show the referenced schema on hover over an external $ref', async function () {
      this.timeout(10000);
      const doc = TextDocument.create(
        'foo://bar/references.json',
        'json',
        0,
        fixture('references.json'),
      );

      const result = await languageService.doHover(doc, Position.create(7, 35));
      const referenced = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string', minLength: 1 },
        },
        $defs: {
          city: { type: 'string', minLength: 1 },
        },
      };

      assert.deepEqual(result, {
        contents: {
          kind: 'markdown',
          value: `***$ref***: **string**\n\n\n\n\n\n\`\`\`json\n${JSON.stringify(referenced, null, 2)}\n\`\`\``,
        },
        range: { start: { line: 7, character: 26 }, end: { line: 7, character: 62 } },
      });
    });

    specify('should go to the definition of an external $ref', async function () {
      this.timeout(10000);
      const doc = TextDocument.create(
        'foo://bar/references.json',
        'json',
        0,
        fixture('references.json'),
      );

      const result = await languageService.doProvideDefinition(doc, {
        position: Position.create(7, 35),
        textDocument: doc,
      });

      assert.deepEqual(result, {
        uri: 'http://localhost:8127/address.json',
        range: { start: { line: 0, character: 1 }, end: { line: 0, character: 2 } },
      });
    });

    specify('should report nothing for resolvable $refs', async function () {
      this.timeout(10000);
      const doc = TextDocument.create('foo://bar/deref.json', 'json', 0, fixture('deref.json'));

      const result = await languageService.doValidation(doc, {
        referenceValidationMode: ReferenceValidationMode.APIDOM_INDIRECT_EXTERNAL,
      });

      assert.deepEqual(result, []);
    });
  });

  context('completion', function () {
    const labels = async (text: string, position: Position, uri: string) => {
      const doc = TextDocument.create(uri, uri.endsWith('.json') ? 'json' : 'yaml', 0, text);
      const result = await languageService.doCompletion(doc, position, { maxNumberOfItems: 200 });
      return result!.items.map((item) => item.label).sort();
    };

    specify('should offer keywords in the root schema in JSON', async function () {
      const text = '{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "\n}';

      assert.deepEqual(
        await labels(text, Position.create(2, 3), 'foo://bar/schema.json'),
        keywords.filter((keyword) => keyword !== '$schema'),
      );
    });

    specify('should offer keywords in a nested schema in JSON', async function () {
      const text = [
        '{',
        '  "$schema": "https://json-schema.org/draft/2020-12/schema",',
        '  "properties": {',
        '    "name": {',
        '      "type": "string",',
        '      "',
        '    }',
        '  }',
        '}',
      ].join('\n');

      assert.deepEqual(
        await labels(text, Position.create(5, 7), 'foo://bar/schema.json'),
        keywords.filter((keyword) => keyword !== 'type'),
      );
    });

    specify('should offer keywords in the root schema in YAML', async function () {
      const text = '$schema: https://json-schema.org/draft/2020-12/schema\n';

      assert.deepEqual(
        await labels(text, Position.create(1, 0), 'foo://bar/schema.yaml'),
        keywords.filter((keyword) => keyword !== '$schema'),
      );
    });

    specify('should offer keywords in a nested schema in YAML', async function () {
      const text = [
        '$schema: https://json-schema.org/draft/2020-12/schema',
        'properties:',
        '  name:',
        '    type: string',
        '    ',
      ].join('\n');

      assert.deepEqual(
        await labels(text, Position.create(4, 4), 'foo://bar/schema.yaml'),
        keywords.filter((keyword) => keyword !== 'type'),
      );
    });

    specify('should offer the simple types as values of type', async function () {
      const text = [
        '$schema: https://json-schema.org/draft/2020-12/schema',
        'properties:',
        '  name:',
        '    type: ',
      ].join('\n');

      assert.deepEqual(await labels(text, Position.create(3, 10), 'foo://bar/schema.yaml'), [
        'array',
        'boolean',
        'integer',
        'null',
        'number',
        'object',
        'string',
      ]);
    });
  });

  context('hover', function () {
    const prefixItemsDocs =
      '#### [prefixItems](https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-10.3.1.1)\n\nThe value of "prefixItems" MUST be a non-empty array of valid JSON Schemas.';

    specify('should show the documentation of a keyword in JSON', async function () {
      const doc = TextDocument.create('foo://bar/valid.json', 'json', 0, fixture('valid.json'));

      const result = await languageService.doHover(doc, Position.create(14, 9));
      const { value } = result!.contents as { value: string };

      assert.isTrue(value.startsWith(`***prefixItems***: **array**\n\n${prefixItemsDocs}`));
    });

    specify('should show the documentation of a keyword in YAML', async function () {
      const doc = TextDocument.create('foo://bar/valid.yaml', 'yaml', 0, fixture('valid.yaml'));

      const result = await languageService.doHover(doc, Position.create(25, 6));
      const { value } = result!.contents as { value: string };

      assert.isTrue(value.startsWith(`***prefixItems***: **array**\n\n${prefixItemsDocs}`));
    });
  });

  context('semantic tokens', function () {
    const tokensJSON = [
      '{',
      '  "$schema": "https://json-schema.org/draft/2020-12/schema",',
      '  "type": "object",',
      '  "required": ["name"],',
      '  "properties": {',
      '    "name": { "type": "string", "maxLength": 10 },',
      '    "address": { "$ref": "#/$defs/address" }',
      '  },',
      '  "$defs": {',
      '    "address": { "type": "object" }',
      '  }',
      '}',
    ].join('\n');
    const tokensYAML = [
      '$schema: https://json-schema.org/draft/2020-12/schema',
      'type: object',
      'required:',
      '  - name',
      'properties:',
      '  name:',
      '    type: string',
      '    maxLength: 10',
      '  address:',
      "    $ref: '#/$defs/address'",
      '$defs:',
      '  address:',
      '    type: object',
    ].join('\n');

    const tokensOf = async (text: string, uri: string) => {
      const doc = TextDocument.create(uri, uri.endsWith('.json') ? 'json' : 'yaml', 0, text);
      const tokens = await languageService.computeSemanticTokens(doc);
      return decodeTokens(tokens.data, languageService.getSemanticTokensLegend().tokenTypes);
    };

    /**
     * Every key is a `key` token and every string or number member value a `value` token, as in
     * OpenAPI documents (array items get no token). A schema with `$ref` keeps the reference
     * classes of OpenAPI 3.1 Schema Objects: its key is a `reference-element` token and the
     * `$ref` value a `reference-value` token.
     */
    specify('should emit key and value tokens in JSON', async function () {
      assert.deepEqual(await tokensOf(tokensJSON, 'foo://bar/schema.json'), [
        [1, 2, 9, 'key'],
        [1, 13, 46, 'value'],
        [2, 2, 6, 'key'],
        [2, 10, 8, 'value'],
        [3, 2, 10, 'key'],
        [4, 2, 12, 'key'],
        [5, 4, 6, 'key'],
        [5, 14, 6, 'key'],
        [5, 22, 8, 'value'],
        [5, 32, 11, 'key'],
        [5, 45, 2, 'value'],
        [6, 4, 9, 'reference-element'],
        [6, 25, 17, 'reference-value'],
        [8, 2, 7, 'key'],
        [9, 4, 9, 'key'],
        [9, 17, 6, 'key'],
        [9, 25, 8, 'value'],
      ]);
    });

    specify('should emit key and value tokens in YAML', async function () {
      assert.deepEqual(await tokensOf(tokensYAML, 'foo://bar/schema.yaml'), [
        [0, 0, 7, 'key'],
        [0, 9, 44, 'value'],
        [1, 0, 4, 'key'],
        [1, 6, 6, 'value'],
        [2, 0, 8, 'key'],
        [4, 0, 10, 'key'],
        [5, 2, 4, 'key'],
        [6, 4, 4, 'key'],
        [6, 10, 6, 'value'],
        [7, 4, 9, 'key'],
        [7, 15, 2, 'value'],
        [8, 2, 7, 'reference-element'],
        [9, 10, 17, 'reference-value'],
        [10, 0, 5, 'key'],
        [11, 2, 7, 'key'],
        [12, 4, 4, 'key'],
        [12, 10, 6, 'value'],
      ]);
    });
  });

  context('dereference', function () {
    const baseURI = 'https://example.com/schemas/person.json';
    const dereferencedJSON = fixture('dereferenced.json');
    const dereferencedYAML = fixture('dereferenced.yaml');

    specify('should dereference a JSON document into JSON', async function () {
      const doc = TextDocument.create('foo://bar/deref.json', 'json', 0, fixture('deref.json'));

      const result = await languageService.doDeref(doc, { format: Format.JSON, baseURI });

      assert.strictEqual(result, dereferencedJSON.trimEnd());
    });

    specify('should dereference a JSON document into YAML', async function () {
      const doc = TextDocument.create('foo://bar/deref.json', 'json', 0, fixture('deref.json'));

      const result = await languageService.doDeref(doc, { format: Format.YAML, baseURI });

      assert.strictEqual(result, dereferencedYAML.trimEnd());
    });

    specify('should dereference a YAML document into JSON', async function () {
      const doc = TextDocument.create('foo://bar/deref.yaml', 'yaml', 0, fixture('deref.yaml'));

      const result = await languageService.doDeref(doc, { format: Format.JSON, baseURI });

      assert.strictEqual(result, dereferencedJSON.trimEnd());
    });

    specify('should dereference a YAML document into YAML', async function () {
      const doc = TextDocument.create('foo://bar/deref.yaml', 'yaml', 0, fixture('deref.yaml'));

      const result = await languageService.doDeref(doc, { format: Format.YAML, baseURI });

      assert.strictEqual(result, dereferencedYAML.trimEnd());
    });
  });
});
