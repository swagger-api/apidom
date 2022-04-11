import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Hover,
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
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';
import { logPerformance, logLevel } from './test-utils';

const spec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-2.0.0.yaml'))
  .toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.yaml'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error-async.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightNoQuotes = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async-noquotes.yaml'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    2,
    2,
    {
      items: [
        {
          label: 'description',
          insertText: 'description: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'A short description of the application. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
          },
        },
        {
          label: 'termsOfService',
          insertText: 'termsOfService: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
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
              '[Contact Object](https://www.asyncapi.com/docs/specifications/v2.3.0#contactObject)\n\\\n\\\nContact information for the exposed API.',
          },
        },
        {
          label: 'license',
          insertText: 'license: \n  $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '[License Object](https://www.asyncapi.com/docs/specifications/v2.3.0#licenseObject)\n\\\n\\\nLicense information for the exposed API.',
          },
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'asyncapi key start',
    0,
    0,
    {
      items: [
        {
          label: 'asyncapi',
          insertText: 'asyncapi: $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The version string signifies the version of the AsyncAPI Specification that the document complies to.\nThe format for this string _must_ be `major`.`minor`.`patch`.  The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\\\n\\\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version. The patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\\\n\\\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.',
          },
        },
        {
          label: 'id',
          insertText: 'id: $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.3.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\\\n\\\nIt is RECOMMENDED to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
          },
        },
        {
          label: 'defaultContentType',
          insertText: 'defaultContentType: $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              "A string representing the default content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). This value MUST be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObjectContentType) property is omitted.\n\\\n\\\nIn case a message can't be encoded/decoded using this value, schema parsers MUST use their default content type.",
          },
        },
        {
          label: 'channels',
          insertText: 'channels: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\\\n\\\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
          },
        },
        {
          label: 'servers',
          insertText: 'servers: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject).',
          },
        },
        {
          label: 'tags',
          insertText: 'tags: \n  - $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'A list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
          },
        },
        {
          label: 'externalDocs',
          insertText: 'externalDocs: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '#### External Documentation Object\n\\\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
          },
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'info key start',
    1,
    0,
    {
      items: [
        {
          label: 'info',
          insertText: 'info: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The object provides metadata about the API. The metadata can be used by the clients if needed.',
          },
        },
        {
          label: 'id',
          insertText: 'id: $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.3.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\\\n\\\nIt is RECOMMENDED to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
          },
        },
        {
          label: 'defaultContentType',
          insertText: 'defaultContentType: $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              "A string representing the default content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). This value MUST be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObjectContentType) property is omitted.\n\\\n\\\nIn case a message can't be encoded/decoded using this value, schema parsers MUST use their default content type.",
          },
        },
        {
          label: 'channels',
          insertText: 'channels: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\\\n\\\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
          },
        },
        {
          label: 'servers',
          insertText: 'servers: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject).',
          },
        },
        {
          label: 'tags',
          insertText: 'tags: \n  - $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'A list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
          },
        },
        {
          label: 'externalDocs',
          insertText: 'externalDocs: \n  $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '#### External Documentation Object\n\\\nAllows referencing an external resource for extended documentation.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\ndescription | `string` | A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\nurl | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### External Documentation Object Example\n\n\n\\\nJSON\n```json\n{\n  "description": "Find more info here",\n  "url": "https://example.com"\n}\n```\n\n\n\\\nYAML\n```yaml\ndescription: Find more info here\nurl: https://example.com\n```',
          },
        },
      ],
      isIncomplete: false,
    },
  ],
];

const hoverTestInput = [
  [
    'operation key',
    8,
    10,
    {
      contents: {
        kind: 'markdown',
        value:
          '***subscribe***: **operation**\n\n[Operation Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationObject)\n\\\n\\\nA definition of the SUBSCRIBE operation, which defines the messages produced by the application and sent to the channel.\n\\\n\\\nDescribes a publish or a subscribe operation. This provides a place to document how and why messages are sent and received.\n\\\n\\\nFor example, an operation might describe a chat application use case where a user sends a text message to a group. A publish operation describes messages that are received by the chat application, whereas a subscribe operation describes messages that are sent by the chat application.\n\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\noperationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\nsummary | `string` | A short summary of what the operation is about.\ndescription | `string` | A verbose explanation of the operation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\ntags | [Tags Object](https://www.asyncapi.com/docs/specifications/v2.3.0#tagsObject) | A list of tags for API documentation control. Tags can be used for logical grouping of operations.\nexternalDocs | [External Documentation Object](https://www.asyncapi.com/docs/specifications/v2.3.0#externalDocumentationObject) | Additional external documentation for this operation.\nbindings | [Operation Bindings Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\ntraits | [[Operation Trait Object](https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) ] | A list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.\nmessage | [Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject) &#124; Map["oneOf", [[Message Object](https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject) &#124; [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject)]] | A definition of the message that will be published or received by this operation. Map containing a single `oneOf` key is allowed here to specify multiple messages. However, **a message MUST be valid only against one of the message objects.**\n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions).\n\n##### Operation Object Example\n\n\n\\\nJSON\n```json\n{\n  "operationId": "registerUser",\n  "summary": "Action to sign a user up.",\n  "description": "A longer description",\n  "tags": [\n    { "name": "user" },\n    { "name": "signup" },\n    { "name": "register" }\n  ],\n  "message": {\n    "headers": {\n      "type": "object",\n      "properties": {\n        "applicationInstanceId": {\n          "description": "Unique identifier for a given instance of the publishing application",\n          "type": "string"\n        }\n      }\n    },\n    "payload": {\n      "type": "object",\n      "properties": {\n        "user": {\n          "$ref": "#/components/schemas/userCreate"\n        },\n        "signup": {\n          "$ref": "#/components/schemas/signup"\n        }\n      }\n    }\n  },\n  "bindings": {\n    "amqp": {\n      "ack": false\n    }\n  },\n  "traits": [\n    { "$ref": "#/components/operationTraits/kafka" }\n  ]\n}\n```\n\n\n\\\nYAML\n```yaml\noperationId: registerUser\nsummary: Action to sign a user up.\ndescription: A longer description\ntags:\n  - name: user\n  - name: signup\n  - name: register\nmessage:\n  headers:\n    type: object\n    properties:\n      applicationInstanceId:\n        description: Unique identifier for a given instance of the publishing application\n        type: string\n  payload:\n    type: object\n    properties:\n      user:\n        $ref: "#/components/schemas/userCreate"\n      signup:\n        $ref: "#/components/schemas/signup"\nbindings:\n  amqp:\n    ack: false\ntraits:\n  - $ref: "#/components/operationTraits/kafka"\n```',
      },
      range: { start: { line: 8, character: 4 }, end: { line: 8, character: 13 } },
    },
  ],
];

describe('apidom-ls-async-yaml', function () {
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [asyncJsonSchemavalidationProvider],
    performanceLogs: logPerformance,
    logLevel,
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
            line: 2,
            character: 0,
          },
          end: {
            line: 2,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 0,
          },
          end: {
            line: 2,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 10077,
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
    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    // TODO yaml errors not recovered? no result?

    /*    assert.deepEqual(result, [
      {
        code: 0,
        message: '(Error ,,,)',
        range: {
          end: {
            character: 6,
            line: 15,
          },
          start: {
            character: 5,
            line: 15,
          },
        },
        severity: 1,
      },
      {
        code: 0,
        message: '(Error ::)',
        range: {
          end: {
            character: 15,
            line: 16,
          },
          start: {
            character: 14,
            line: 16,
          },
        },
        severity: 1,
      },
    ]); */
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
              line: 0,
              character: 0,
            },
            end: {
              line: 0,
              character: 8,
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
      {
        name: 'components',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 6,
              character: 0,
            },
            end: {
              line: 6,
              character: 10,
            },
          },
        },
      },
      {
        name: 'components-schemas',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 7,
              character: 2,
            },
            end: {
              line: 7,
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

  it('test semantic highlighting async', async function () {
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
        0, 0, 8, 2, 0, 1, 0, 4, 4, 0, 1, 2, 7, 1, 0, 1, 0, 7, 25, 0, 1, 2, 4, 24, 0, 1, 4, 3, 11, 0,
        1, 0, 8, 28, 0, 1, 2, 3, 27, 0, 1, 4, 9, 5, 16, 1, 6, 7, 35, 64, 0, 9, 17, 32, 64, 1, 6, 7,
        35, 64, 1, 8, 7, 23, 0, 1, 10, 4, 35, 64, 0, 6, 6, 32, 64,
      ],
    });
  });

  it('test hover async', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightNoQuotes.json',
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
      assert.deepEqual(result, input[3] as Hover);
    }
  });
});
