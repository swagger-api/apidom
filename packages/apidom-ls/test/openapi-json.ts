import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionParams, ReferenceParams } from 'vscode-languageserver-protocol';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Hover,
  Position,
  Location,
  SymbolInformation,
} from 'vscode-languageserver-types';
import { Element, traverse } from '@swagger-api/apidom-core';

import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
  FORMAT,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { getParser } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
/* const specAjvSimple = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ajv-simple-api.json'))
  .toString(); */
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.json'))
  .toString();
const specHighlight = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api.json'))
  .toString();

const specLinterUpper = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-upper.json'))
  .toString();

const specLinterNoVersion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-no-version.json'))
  .toString();

const derefBaseURI = path.join(__dirname, 'fixtures', 'deref/rootwithserver.json').toString();

const specDeref = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/rootwithserver.json'))
  .toString();
const specDereferenced = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/dereferenced.json'))
  .toString();

const specFull = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/fullroot.json'))
  .toString();

const specFullResponses = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/fullrootresponses.json'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    3,
    2,
    {
      items: [
        {
          documentation: 'Add `paths` section',
          insertText: '"paths": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 10,
          label: 'paths',
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'openapi key start',
    2,
    2,
    {
      items: [
        {
          documentation: 'Add `openapi` property',
          insertText: '"openapi": "$1",\n',
          insertTextFormat: 2,
          kind: 10,
          label: 'openapi',
        },
        {
          documentation: 'Add `paths` section',
          insertText: '"paths": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 10,
          label: 'paths',
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'info key start',
    4,
    2,
    {
      items: [
        {
          documentation: 'Add `info` section',
          insertText: '"info": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 10,
          label: 'info',
        },
        {
          documentation: 'Add `paths` section',
          insertText: '"paths": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 10,
          label: 'paths',
        },
      ],
      isIncomplete: false,
    },
  ],
];

const hoverTestInput = [
  [
    'operation key',
    10,
    9,
    {
      contents: {
        kind: 'markdown',
        value:
          '**operation**\n\nGET https://petstore3.swagger.io/api/v3/pet/a\n\ncurl -X GET https://petstore3.swagger.io/api/v3/pet/a\n\nhttps://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationObject\n\n#### Operation Object\n\nDescribes a single API operation on a path.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n[tags](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationTags) | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.\n[summary](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationSummary) | `string` | A short summary of what the operation does.\n[description](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationDescription) | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n[externalDocs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationExternalDocs) | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#externalDocumentationObject) | Additional external documentation for this operation.\n[operationId](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationId) | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\n[parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationParameters) | [[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#pathItemParameters), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterName) and [location](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#parameterIn). The list can use the [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject) to link to parameters that are defined at the [OpenAPI Object\'s components/parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#componentsParameters).\n[requestBody](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationRequestBody) | [Request Body Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#requestBodyObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md##referenceObject) | The request body applicable for this operation.  The `requestBody` is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.\n[responses](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationResponses) | [Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#responsesObject) | The list of possible responses as they are returned from executing this operation.\n[callbacks](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationCallbacks) | Map[`string`, [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#referenceObject)] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#callbackObject) that describes a request that may be initiated by the API provider and the expected responses.\n[deprecated](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationDeprecated) | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.\n[security](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationSecurity) | [[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#securityRequirementObject)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.\n[servers](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#operationServers) | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject)] | An alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions).\n\n##### Operation Object Example\n\n```json\n{\n  "tags": [\n    "pet"\n  ],\n  "summary": "Updates a pet in the store with form data",\n  "operationId": "updatePetWithForm",\n  "parameters": [\n    {\n      "name": "petId",\n      "in": "path",\n      "description": "ID of pet that needs to be updated",\n      "required": true,\n      "schema": {\n        "type": "string"\n      }\n    }\n  ],\n  "requestBody": {\n    "content": {\n      "application/x-www-form-urlencoded": {\n        "schema": {\n          "type": "object",\n          "properties": {\n            "name": { \n              "description": "Updated name of the pet",\n              "type": "string"\n            },\n            "status": {\n              "description": "Updated status of the pet",\n              "type": "string"\n            }\n          },\n          "required": ["status"] \n        }\n      }\n    }\n  },\n  "responses": {\n    "200": {\n      "description": "Pet updated.",\n      "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    },\n    "405": {\n      "description": "Method Not Allowed",\n      "content": {\n        "application/json": {},\n        "application/xml": {}\n      }\n    }\n  },\n  "security": [\n    {\n      "petstore_auth": [\n        "write:pets",\n        "read:pets"\n      ]\n    }\n  ]\n}\n```\n\n```yaml\ntags:\n- pet\nsummary: Updates a pet in the store with form data\noperationId: updatePetWithForm\nparameters:\n- name: petId\n  in: path\n  description: ID of pet that needs to be updated\n  required: true\n  schema:\n    type: string\nrequestBody:\n  content:\n    \'application/x-www-form-urlencoded\':\n      schema:\n       properties:\n          name: \n            description: Updated name of the pet\n            type: string\n          status:\n            description: Updated status of the pet\n            type: string\n       required:\n         - status\nresponses:\n  \'200\':\n    description: Pet updated.\n    content: \n      \'application/json\': {}\n      \'application/xml\': {}\n  \'405\':\n    description: Method Not Allowed\n    content: \n      \'application/json\': {}\n      \'application/xml\': {}\nsecurity:\n- petstore_auth:\n  - write:pets\n  - read:pets\n```',
      },
      range: { start: { line: 10, character: 6 }, end: { line: 10, character: 11 } },
    },
  ],
  [
    'servers key',
    5,
    8,
    {
      contents: {
        kind: 'markdown',
        value:
          '**array**\n\n#### [Servers](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasservers)\n\n\nField Name | Type | Description\n---|:---:|---\nservers | [[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject)] | An array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverObject) with a [url](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverUrl) value of `/`.\n\n\n#### Server Object\n\nAn object representing a Server.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nurl | `string` | **REQUIRED**. A URL to the target host.  This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenAPI document is being served. Variable substitutions will be made when a variable is named in `{`brackets`}`.\ndescription | `string` | An optional string describing the host designated by the URL. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\nvariables | Map[`string`, [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverVariableObject)] | A map between a variable name and its value.  The value is used for substitution in the server\'s URL template.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions).\n\n##### Server Object Example\n\nA single server would be described as:\n\n```json\n{\n  "url": "https://development.gigantic-server.com/v1",\n  "description": "Development server"\n}\n```\n\n```yaml\nurl: https://development.gigantic-server.com/v1\ndescription: Development server\n```\n\nThe following shows how multiple servers can be described, for example, at the OpenAPI Object\'s [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#oasServers):\n\n```json\n{\n  "servers": [\n    {\n      "url": "https://development.gigantic-server.com/v1",\n      "description": "Development server"\n    },\n    {\n      "url": "https://staging.gigantic-server.com/v1",\n      "description": "Staging server"\n    },\n    {\n      "url": "https://api.gigantic-server.com/v1",\n      "description": "Production server"\n    }\n  ]\n}\n```\n\n```yaml\nservers:\n- url: https://development.gigantic-server.com/v1\n  description: Development server\n- url: https://staging.gigantic-server.com/v1\n  description: Staging server\n- url: https://api.gigantic-server.com/v1\n  description: Production server\n```\n\nThe following shows how variables can be used for a server configuration:\n\n```json\n{\n  "servers": [\n    {\n      "url": "https://{username}.gigantic-server.com:{port}/{basePath}",\n      "description": "The production API server",\n      "variables": {\n        "username": {\n          "default": "demo",\n          "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"\n        },\n        "port": {\n          "enum": [\n            "8443",\n            "443"\n          ],\n          "default": "8443"\n        },\n        "basePath": {\n          "default": "v2"\n        }\n      }\n    }\n  ]\n}\n```\n\n```yaml\nservers:\n- url: https://{username}.gigantic-server.com:{port}/{basePath}\n  description: The production API server\n  variables:\n    username:\n      # note! no enum here means it is an open value\n      default: demo\n      description: this value is assigned by the service provider, in this example `gigantic-server.com`\n    port:\n      enum:\n        - \'8443\'\n        - \'443\'\n      default: \'8443\'\n    basePath:\n      # open meaning there is the opportunity to use special base paths as assigned by the provider, default is `v2`\n      default: v2\n```\n\n\n#### Server Variable Object\n\nAn object representing a Server Variable for server URL template substitution.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\nenum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set. The array MUST NOT be empty.\ndefault | `string` |  **REQUIRED**. The default value to use for substitution, which SHALL be sent if an alternate value is _not_ supplied. Note this behavior is different than the [Schema Object\'s](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#schemaObject) treatment of default values, because in those cases parameter values are optional. If the [`enum`](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#serverVariableEnum) is defined, the value MUST exist in the enum\'s values.\ndescription | `string` | An optional description for the server variable. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md#specificationExtensions).',
      },
      range: { start: { line: 5, character: 2 }, end: { line: 5, character: 11 } },
    },
  ],
];

const defTestInput = [
  [
    'ref value',
    42,
    33,
    {
      range: {
        end: {
          character: 7,
          line: 54,
        },
        start: {
          character: 13,
          line: 52,
        },
      },
      uri: 'foo://bar/specFull.json',
    },
  ],
];

const refTestInput = [
  [
    'def value',
    42,
    33,
    [
      {
        range: {
          end: {
            character: 7,
            line: 54,
          },
          start: {
            character: 13,
            line: 52,
          },
        },
        uri: 'foo://bar/specFullRefs.json',
      },
    ],
  ],
];

describe('apidom-ls', function () {
  const oasJsonSchemavalidationProvider = new OpenAPi31JsonSchemaValidationProvider();
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [oasJsonSchemavalidationProvider],
  };

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
    let doc: TextDocument = TextDocument.create('foo://bar/spec.json', 'json', 0, spec);

    let result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: {
          start: {
            line: 11,
            character: 4,
          },
          end: {
            line: 11,
            character: 13,
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
            character: 2,
          },
          end: {
            line: 3,
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
            line: 77,
            character: 13,
          },
          end: {
            line: 77,
            character: 51,
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
            line: 185,
            character: 6,
          },
          end: {
            line: 185,
            character: 18,
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
            line: 104,
            character: 8,
          },
          end: {
            line: 104,
            character: 20,
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
            line: 113,
            character: 8,
          },
          end: {
            line: 113,
            character: 19,
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
            line: 27,
            character: 6,
          },
          end: {
            line: 27,
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
            line: 27,
            character: 6,
          },
          end: {
            line: 27,
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
            line: 35,
            character: 6,
          },
          end: {
            line: 35,
            character: 12,
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
            line: 35,
            character: 6,
          },
          end: {
            line: 35,
            character: 12,
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
            line: 51,
            character: 6,
          },
          end: {
            line: 51,
            character: 19,
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
            line: 51,
            character: 6,
          },
          end: {
            line: 51,
            character: 19,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
    ]);
  });

  it('test validation and linter', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specLinterUpper.json',
      'json',
      0,
      specLinterUpper,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: {
          start: {
            line: 1,
            character: 13,
          },
          end: {
            line: 1,
            character: 20,
          },
        },
        message: 'must match pattern "^3\\.1\\.\\d+(-.+)?$"',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
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
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'description'",
        severity: 1,
        code: 3,
        source: 'apilint',
        data: {
          quickFix: {
            message: "add 'description' field",
            action: 'addChild',
            snippetYaml: 'description: \n  ',
            snippetJson: '"description": "",\n    ',
          },
        },
      },
      {
        range: {
          start: {
            line: 11,
            character: 23,
          },
          end: {
            line: 11,
            character: 29,
          },
        },
        message: 'UPPERCASE Not allowed!',
        severity: 1,
        code: 2,
        source: 'apilint',
        data: {
          quickFix: {
            message: 'transform to lowercase',
            function: 'tranformToLowercase',
            action: 'transformValue',
          },
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });

  it('test linter no version', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specLinterNoVersion.json',
      'json',
      0,
      specLinterNoVersion,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: {
          start: {
            line: 1,
            character: 13,
          },
          end: {
            line: 1,
            character: 20,
          },
        },
        message: 'must match pattern "^3\\.1\\.\\d+(-.+)?$"',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'description'",
        severity: 1,
        code: 3,
        source: 'apilint',
        data: {
          quickFix: {
            message: "add 'description' field",
            action: 'addChild',
            snippetYaml: 'description: \n  ',
            snippetJson: '"description": "",\n    ',
          },
        },
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 4,
        source: 'apilint',
        data: {
          quickFix: {
            message: "add 'version' field",
            action: 'addChild',
            snippetYaml: 'version: \n  ',
            snippetJson: '"version": "",\n    ',
          },
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });

  it('test completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletion.json',
      'json',
      0,
      specCompletion,
    );

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
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionSymbols.json',
      'json',
      0,
      specCompletion,
    );

    const result = await languageService.doFindDocumentSymbols(doc);

    // console.log(JSON.stringify(result));
    const expected: SymbolInformation[] = [
      {
        name: 'spec-version',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 11,
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
              line: 4,
              character: 2,
            },
            end: {
              line: 4,
              character: 8,
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
              line: 8,
              character: 4,
            },
            end: {
              line: 8,
              character: 13,
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
      'foo://bar/specHighlight.json',
      'json',
      0,
      specHighlight,
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
        1, 2, 9, 16, 0, 0, 0, 9, 2, 0, 1, 2, 6, 4, 0, 1, 4, 9, 1, 0, 2, 2, 9, 25, 0, 1, 5, 5, 11, 0,
        2, 2, 7, 18, 0, 1, 4, 4, 6, 0, 1, 6, 5, 5, 16, 1, 8, 13, 35, 64, 0, 15, 6, 32, 64, 2, 6, 6,
        5, 32, 1, 8, 13, 35, 64, 0, 15, 7, 32, 64, 3, 4, 4, 6, 0, 1, 6, 6, 5, 32, 1, 8, 13, 35, 64,
        0, 15, 7, 32, 64, 3, 4, 4, 6, 0, 1, 6, 5, 5, 16, 1, 8, 13, 35, 64, 0, 15, 6, 32, 64,
      ],
    });
  });

  it('test hover', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightHover.json',
      'json',
      0,
      specHighlight,
    );

    for (const input of hoverTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing hover for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doHover(doc, pos);
      assert.deepEqual(result, input[3] as Hover);
    }
  });

  it('test deref', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specDeref.json', 'json', 0, specDeref);

    const result = await languageService.doDeref(doc, {
      format: FORMAT.JSON,
      baseURI: derefBaseURI,
    });

    // calling with no baseURI, in this case deref service will try to use the first defined server URL as baseURI
    // const result = await languageService.doDeref(doc);
    assert.equal(result, specDereferenced.substr(0, specDereferenced.length - 1));
  });

  it('test definition', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specFull.json', 'json', 0, specFull);

    for (const input of defTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing def for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const definitionParams: DefinitionParams = {
        position: pos,
        textDocument: doc,
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideDefinition(doc, definitionParams);
      assert.deepEqual(result, input[3] as Location);
    }
  });

  it('test references', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specFullRefs.json',
      'json',
      0,
      specFull,
    );

    for (const input of refTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing refs for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const referenceParams: ReferenceParams = {
        position: pos,
        textDocument: doc,
        context: { includeDeclaration: false },
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideReferences(doc, referenceParams);
      assert.deepEqual(result, input[3] as Location[]);
    }
  });

  // eslint-disable-next-line consistent-return
  it('test parse json', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/file.json',
      'json',
      0,
      specFullResponses,
    );

    const parser = getParser(doc);
    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    // eslint-disable-next-line consistent-return
    const result = await parser.parse(text, { sourceMap: true });

    const { api } = result;
    if (!api) {
      return diagnostics;
    }
    api.freeze(); // !! freeze and add parent !!

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function printSourceMap(node: Element): void {
      const sm: SourceMap = getSourceMap(node);
      // eslint-disable-next-line no-console
      console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
    }

    function printContent(node: Element): void {
      const sm: SourceMap = getSourceMap(node);
      // eslint-disable-next-line no-console
      console.log(
        node.element,
        node.getMetaProperty('classes', []).toValue(),
        node.getMetaProperty('httpMethod', []).toValue(),
        `[${sm.offset} / ${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}]`,
        node.toValue(),
      );
    }

    // traverse(printSourceMap, api);
    traverse(printContent, api);

    if (result.annotations) {
      for (const annotation of result.annotations) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(annotation));
      }
    }
  });
});
