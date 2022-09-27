import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Position,
  SymbolInformation,
} from 'vscode-languageserver-types';

// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';
import { logLevel, logPerformance } from './test-utils';
import testTokens from './test-tokens';

// eslint-disable-next-line import/prefer-default-export
export function logj(e: unknown, label?: string): void {
  // eslint-disable-next-line no-console
  console.log((label ? `${label}: ` : '') + JSON.stringify(e));
}
export function log(e: unknown, label?: string): void {
  // eslint-disable-next-line no-console
  console.log((label ? `${label}: ` : '') + e);
}

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.yaml')).toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.yaml'))
  .toString();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specCompletionNoEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-no-empty.yaml'))
  .toString();

const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlight = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightNoQuotes = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-noquotes.yaml'))
  .toString();

const specInvalidYaml = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'invalidyaml.yaml'))
  .toString();

const specInvalidYamlIndent = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'validation', 'oas', 'invalidyamlindent.yaml'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    2,
    2,
    {
      items: [
        {
          label: 'summary',
          insertText: 'summary: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value: 'A short summary of the API.',
          },
          targetSpecs: [
            {
              namespace: 'openapi',
              version: '3.1.0',
            },
          ],
        },
        {
          label: 'description',
          insertText: 'description: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'A description of the API. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.',
          },
        },
        {
          label: 'termsOfService',
          insertText: 'termsOfService: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value: 'A URL to the Terms of Service for the API. This MUST be in the form of a URL.',
          },
        },
        {
          label: 'contact',
          insertText: 'contact: \n  $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '[Contact Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#contactObject)\n\\\n\\\nThe contact information for the exposed API.',
          },
          targetSpecs: [
            {
              namespace: 'openapi',
              version: '3.1.0',
            },
          ],
        },
        {
          label: 'license',
          insertText: 'license: \n  $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '[License Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#licenseObject)\n\\\n\\\nThe license information for the exposed API.',
          },
          targetSpecs: [
            {
              namespace: 'openapi',
              version: '3.1.0',
            },
          ],
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'openapi key start',
    0,
    0,
    {
      items: [],
      isIncomplete: false,
    },
  ],
  [
    'info key start',
    1,
    0,
    {
      items: [],
      isIncomplete: false,
    },
  ],
];

const hoverTestInput = [
  [
    'operation key',
    9,
    5,
    {
      contents: {
        kind: 'markdown',
        value:
          '**operation**\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject\n\n#### Operation Object\n\nDescribes a single API operation on a path.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n[tags](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationTags) | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.\n[summary](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationSummary) | `string` | A short summary of what the operation does.\n[description](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationDescription) | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n[externalDocs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationExternalDocs) | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this operation.\n[operationId](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationId) | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\n[parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationParameters) | [[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsParameters).\n[requestBody](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationRequestBody) | [Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#requestBodyObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md##referenceObject) | The request body applicable for this operation.  The `requestBody` is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.\n[responses](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationResponses) | [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#responsesObject) | The list of possible responses as they are returned from executing this operation.\n[callbacks](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationCallbacks) | Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject)] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.\n[deprecated](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationDeprecated) | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.\n[security](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationSecurity) | [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securityRequirementObject)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.\n[servers](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationServers) | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject)] | An alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions).\n\n##### Operation Object Example\n\n\n\\\nJSON\n```json\n{\n  "tags": [\n    "pet"\n  ],\n  "summary": "Updates a pet in the store with form data",\n  "operationId": "updatePetWithForm",\n  "parameters": [\n    {\n      "name": "petId",\n      "in": "path",\n      "description": "ID of pet that needs to be updated",\n      "required": true,\n      "schema": {\n        "type": "string"\n      }\n    }\n  ],\n  "requestBody": {\n    "content": {\n      "application/x-www-form-urlencoded": {\n        "schema": {\n          "type": "object",\n          "properties": {\n            "name": { \n              "description": "Updated name of the pet",\n              "type": "string"\n            },\n            "status": {\n              "description": "Updated status of the pet",\n              "type": "string"\n            }\n          },\n          "required": ["status"] \n        }\n      }\n    }\n  },\n  "responses": {\n    "200": {\n      "description": "Pet updated.",\n      "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    },\n    "405": {\n      "description": "Method Not Allowed",\n      "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    }\n  },\n  "security": [\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\ntags:\n- pet\nsummary: Updates a pet in the store with form data\noperationId: updatePetWithForm\nparameters:\n- name: petId\n  in: path\n  description: ID of pet that needs to be updated\n  required: true\n  schema:\n    type: string\nrequestBody:\n  content:\n    \'application/x-www-form-urlencoded\':\n      schema:\n       properties:\n          name: \n            description: Updated name of the pet\n            type: string\n          status:\n            description: Updated status of the pet\n            type: string\n       required:\n         - status\nresponses:\n  \'200\':\n    description: Pet updated.\n    content: \n      \'application/json\': {}\n      \'application/xml\': {}\n  \'405\':\n    description: Method Not Allowed\n    content: \n      \'application/json\': {}\n      \'application/xml\': {}\nsecurity:\n- petstore_auth:\n  - write:pets\n  - read:pets\n```',
      },
      range: { start: { line: 9, character: 4 }, end: { line: 9, character: 8 } },
    },
  ],
];

describe('apidom-ls-yaml', function () {
  const metadataOas = JSON.parse(JSON.stringify(metadata()));
  const oasJsonSchemavalidationProvider = new OpenAPi31JsonSchemaValidationProvider();
  const context: LanguageServiceContext = {
    metadata: metadataOas,
    validatorProviders: [oasJsonSchemavalidationProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  context.metadata!.tokens = testTokens;

  const languageService: LanguageService = getLanguageService(context);

  after(function () {
    languageService.terminate();
  });

  it('test parse and syntax validation', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    let doc: TextDocument = TextDocument.create('foo://bar/spec.yaml', 'yaml', 0, spec);

    let result = await languageService.doValidation(doc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 12,
            character: 2,
          },
          end: {
            line: 12,
            character: 9,
          },
        },
        message: 'must match exactly one schema in oneOf',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 0,
          },
          end: {
            line: 3,
            character: 4,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 55,
            character: 9,
          },
          end: {
            line: 55,
            character: 45,
          },
        },
        message: 'must match format "uri-reference"',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 127,
            character: 4,
          },
          end: {
            line: 127,
            character: 14,
          },
        },
        message: 'must be array',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 78,
            character: 6,
          },
          end: {
            line: 78,
            character: 16,
          },
        },
        message: 'must be array',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 85,
            character: 6,
          },
          end: {
            line: 85,
            character: 15,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 25,
            character: 4,
          },
          end: {
            line: 25,
            character: 11,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 25,
            character: 4,
          },
          end: {
            line: 25,
            character: 11,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 30,
            character: 4,
          },
          end: {
            line: 30,
            character: 8,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 30,
            character: 4,
          },
          end: {
            line: 30,
            character: 8,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 41,
            character: 4,
          },
          end: {
            line: 41,
            character: 15,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 41,
            character: 4,
          },
          end: {
            line: 41,
            character: 15,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 4,
            line: 3,
          },
          start: {
            character: 0,
            line: 3,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);

    doc = TextDocument.create('foo://bar/specError.yaml', 'yaml', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    // TODO yaml errors not recovered? no result?
    /*     assert.deepEqual(result, [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
      },
    ]); */
  });

  it('test parse and syntax validation simpler no quotes', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightNoQuotes.yaml',
      'yaml',
      0,
      specHighlightNoQuotes,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected: Diagnostic[] = [
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 1,
            character: 0,
          },
          end: {
            line: 1,
            character: 4,
          },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 3020101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected);
  });

  it('test completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    const doc = TextDocument.create('foo://bar/specCompletion.yaml', 'yaml', 0, specCompletion);

    for (const input of completionTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing completion for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doCompletion(
        doc,
        { textDocument: doc, position: pos },
        completionContext,
      );
      assert.deepEqual(result, input[3] as CompletionList);
    }
  });

  it('test symbols', async function () {
    // valid spec
    const doc = TextDocument.create(
      'foo://bar/specCompletionSymbols.yaml',
      'yaml',
      0,
      specCompletion,
    );

    const result = await languageService.doFindDocumentSymbols(doc);

    const expected: SymbolInformation[] = [
      {
        name: 'spec-version',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 0,
              character: 0,
            },
            end: {
              line: 0,
              character: 7,
            },
          },
        },
      },
      {
        name: 'info',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 1,
              character: 0,
            },
            end: {
              line: 1,
              character: 4,
            },
          },
        },
      },
      {
        name: 'api-version',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 5,
              character: 2,
            },
            end: {
              line: 5,
              character: 9,
            },
          },
        },
      },
    ];
    assert.equal(result[0].name, expected[0].name);
    assert.equal(result[0].kind, expected[0].kind);
    assert.deepEqual(result[0].location.range, expected[0].location.range);
    assert.equal(result[1].name, expected[1].name);
    assert.equal(result[1].kind, expected[1].kind);
    assert.deepEqual(result[1].location.range, expected[1].location.range);
  });

  it('test semantic highlighting', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightNoQuotes.json',
      'json',
      0,
      specHighlightNoQuotes,
    );

    const tokens = await languageService.computeSemanticTokens(doc);
    if (tokens.data && tokens.data.length >= 5) {
      const logBase = (n: number) => Math.log(n) / Math.log(2);
      for (let i = 0; i < tokens.data.length; i += 5) {
        // eslint-disable-next-line no-console
        console.log(
          `[${tokens.data[i]}, ${tokens.data[i + 1]}, ${tokens.data[i + 2]}, ${
            tokens.data[i + 3]
          }, ${tokens.data[i + 4]}] type: ${
            languageService.getSemanticTokensLegend().tokenTypes[tokens.data[i + 3]]
          }, mod: ${
            languageService.getSemanticTokensLegend().tokenModifiers[logBase(tokens.data[i + 4])]
          } / semTok: +line: ${tokens.data[i]}, off: ${tokens.data[i + 1]}, len: ${
            tokens.data[i + 2]
          }`,
        );
      }
    }
    assert.deepEqual(tokens, {
      data: [
        0, 0, 7, 16, 0, 0, 0, 7, 2, 0, 1, 0, 4, 4, 0, 1, 2, 7, 1, 0, 1, 0, 7, 25, 0, 1, 4, 3, 11, 0,
        1, 0, 5, 18, 0, 1, 2, 2, 6, 0, 1, 4, 3, 5, 16, 1, 6, 11, 35, 64, 0, 13, 4, 32, 64, 1, 4, 4,
        5, 32, 1, 6, 11, 35, 64, 0, 13, 5, 32, 64, 1, 2, 2, 6, 0, 1, 4, 4, 5, 32, 1, 6, 11, 35, 64,
        0, 13, 5, 32, 64, 1, 2, 2, 6, 0, 1, 4, 3, 5, 16, 1, 6, 11, 35, 64, 0, 13, 4, 32, 64,
      ],
    });
  });

  it('test hover', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightNoQuotesHover.json',
      'json',
      0,
      specHighlightNoQuotes,
    );

    for (const input of hoverTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing hover for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doHover(doc, pos);
      // @ts-ignore
      assert(result?.contents.value.startsWith('***post***: **operation**'));
    }
  });

  it('test validate invalid YAML', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specInvalidYaml.yaml',
      'yaml',
      0,
      specInvalidYaml,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 5,
            character: 0,
          },
          end: {
            line: 5,
            character: 3,
          },
        },
        message: '(Error foo)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });
  it('test validate invalid YAML indent', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specInvalidYamlIndent.yaml',
      'yaml',
      0,
      specInvalidYamlIndent,
    );

    const result = await languageService.doValidation(doc, validationContext);
    const expected = [
      {
        range: {
          start: {
            line: 3,
            character: 4,
          },
          end: {
            line: 3,
            character: 20,
          },
        },
        message: '(Error title: Something)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });
});
