import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionParams, ReferenceParams } from 'vscode-languageserver-protocol';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
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
  Format,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { parse } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';
import { logPerformance, logLevel } from './test-utils';
import testTokens from './test-tokens';

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
          documentation: {
            kind: 'markdown',
            value:
              'The default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) contained within this OAS document. This MUST be in the form of a URI.',
          },
          insertText: '"jsonSchemaDialect": "$1",',
          insertTextFormat: 2,
          kind: 14,
          label: 'jsonSchemaDialect',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) with a [url](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverUrl) value of `/`.',
          },
          insertText: '"servers": [\n  $1\n],',
          insertTextFormat: 2,
          kind: 14,
          label: 'servers',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject)\n\\\n\\\n**REQUIRED**. The available paths and operations for the API.',
          },
          insertText: '"paths": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 14,
          label: 'paths',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nThe incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An [example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.yaml) is available.',
          },
          insertText: '"webhooks": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 14,
          label: 'webhooks',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject)\n\\\n\\\nAn element to hold various schemas for the specification.',
          },
          insertText: '"components": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 14,
          label: 'components',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.',
          },
          insertText: '"security": [\n  $1\n],',
          insertTextFormat: 2,
          kind: 14,
          label: 'security',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              "[[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tagObject)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
          },
          insertText: '"tags": [\n  $1\n],',
          insertTextFormat: 2,
          kind: 14,
          label: 'tags',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation.',
          },
          insertText: '"externalDocs": {\n  $1\n},',
          insertTextFormat: 2,
          kind: 14,
          label: 'externalDocs',
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
          documentation: {
            kind: 'markdown',
            value:
              '**REQUIRED**. This string MUST be the [version number](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#versions) of the OpenAPI Specification that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling to interpret the OpenAPI document. This is *not* related to the API [`info.version`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoVersion) string.',
          },
          insertText: '"openapi": "$1",\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'openapi',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              'The default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) contained within this OAS document. This MUST be in the form of a URI.',
          },
          insertText: '"jsonSchemaDialect": "$1",\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'jsonSchemaDialect',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) with a [url](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverUrl) value of `/`.',
          },
          insertText: '"servers": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'servers',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject)\n\\\n\\\n**REQUIRED**. The available paths and operations for the API.',
          },
          insertText: '"paths": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'paths',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nThe incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An [example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.yaml) is available.',
          },
          insertText: '"webhooks": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'webhooks',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject)\n\\\n\\\nAn element to hold various schemas for the specification.',
          },
          insertText: '"components": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'components',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.',
          },
          insertText: '"security": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'security',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              "[[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tagObject)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
          },
          insertText: '"tags": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'tags',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation.',
          },
          insertText: '"externalDocs": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'externalDocs',
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
          documentation: {
            kind: 'markdown',
            value:
              '[Info Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#infoObject)\n\\\n\\\n**REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.',
          },
          insertText: '"info": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'info',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              'The default value for the `$schema` keyword within [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject) contained within this OAS document. This MUST be in the form of a URI.',
          },
          insertText: '"jsonSchemaDialect": "$1",\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'jsonSchemaDialect',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) with a [url](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverUrl) value of `/`.',
          },
          insertText: '"servers": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'servers',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject)\n\\\n\\\n**REQUIRED**. The available paths and operations for the API.',
          },
          insertText: '"paths": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'paths',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              'Map[`string`, [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nThe incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the `callbacks` feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An [example](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.1/webhook-example.yaml) is available.',
          },
          insertText: '"webhooks": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'webhooks',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[Components Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#componentsObject)\n\\\n\\\nAn element to hold various schemas for the specification.',
          },
          insertText: '"components": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'components',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityRequirementObject)]\n\\\n\\\nA declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.',
          },
          insertText: '"security": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'security',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              "[[Tag Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#tagObject)]\n\\\n\\\nA list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.",
          },
          insertText: '"tags": [\n  $1\n],\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'tags',
        },
        {
          documentation: {
            kind: 'markdown',
            value:
              '[External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#externalDocumentationObject)\n\\\n\\\nAdditional external documentation.',
          },
          insertText: '"externalDocs": {\n  $1\n},\n',
          insertTextFormat: 2,
          kind: 14,
          label: 'externalDocs',
        },
      ],
      isIncomplete: false,
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
    let doc: TextDocument = TextDocument.create('foo://bar/spec.json', 'json', 0, spec);

    let result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
      {
        range: { start: { line: 3, character: 2 }, end: { line: 3, character: 8 } },
        message: 'Object includes not allowed fields',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: { start: { line: 14, character: 6 }, end: { line: 14, character: 18 } },
        message: 'The identifier field and url field are mutually exclusive.',
        severity: 1,
        code: 7030101,
        source: 'apilint',
      },
      {
        range: { start: { line: 185, character: 20 }, end: { line: 190, character: 7 } },
        message: 'parameters must be an array',
        severity: 1,
        code: 5121300,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 92, character: 4 }, end: { line: 92, character: 12 } },
        message: 'parameters must be an array of Parameter Objects',
        severity: 1,
        code: 5121301,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 104, character: 22 }, end: { line: 109, character: 9 } },
        message: 'parameters must be an array',
        severity: 1,
        code: 5130600,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 95, character: 6 }, end: { line: 95, character: 11 } },
        message: 'parameters must be an array of Parameter Objects',
        severity: 1,
        code: 5130601,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 110, character: 8 }, end: { line: 110, character: 21 } },
        message:
          'requestBody does not have well-defined semantics for GET, HEAD and DELETE operations',
        severity: 2,
        code: 5160500,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 113, character: 8 }, end: { line: 113, character: 19 } },
        message: 'Responses Object values must be of Response Object shape',
        severity: 1,
        code: 5140001,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 113, character: 8 }, end: { line: 113, character: 19 } },
        message:
          'Responses Object uses HTTP Status Codes outside of allowed IANA HTTP Status code registry',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
    ];
    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, expected as Diagnostic[]);
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
        message: "should always have a 'title'",
        severity: 1,
        code: 5020101,
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
        message: "should always have a 'version'",
        severity: 1,
        code: 5020601,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
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

  it('should dereference into JSON', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specDeref.json', 'json', 0, specDeref);

    const result = await languageService.doDeref(doc, {
      format: Format.JSON,
      baseURI: derefBaseURI,
    });

    // calling with no baseURI, in this case deref service will try to use the first defined server URL as baseURI
    // const result = await languageService.doDeref(doc);
    assert.equal(result, specDereferenced.substr(0, specDereferenced.length - 1));
  });

  it('should dereference into YAML 1.2', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specDeref.json', 'json', 0, specDeref);

    const result = await languageService.doDeref(doc, {
      format: Format.YAML,
      baseURI: derefBaseURI,
    });

    // calling with no baseURI, in this case deref service will try to use the first defined server URL as baseURI
    // const result = await languageService.doDeref(doc);
    assert.match(result, /^\n"openapi": "3.1.0"/);
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

    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    // eslint-disable-next-line consistent-return
    const result = await parse(text, undefined);

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
        node.getMetaProperty('http-method', []).toValue(),
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
