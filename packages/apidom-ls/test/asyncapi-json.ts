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
import { getParser } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';

const spec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-2.0.0.json'))
  .toString();
const specValidationExpected = fs
  .readFileSync(
    path.join(
      __dirname,
      'fixtures',
      'expected',
      'apidom-ls-async',
      'sample-api-async-validation-2.0.0.json',
    ),
  )
  .toString();

const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error-async.json'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async.json'))
  .toString();

const specDeref = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/async/asyncrootwithserver.json'))
  .toString();
const derefBaseURI = path
  .join(__dirname, 'fixtures', 'deref/async/asyncrootwithserver.json')
  .toString();
const specDereferenced = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/async/dereferenced.json'))
  .toString();

const specFull = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/async/fullrootasync.json'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    3,
    2,
    {
      items: [
        {
          label: 'id',
          insertText: '"id": "$1",',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\n ---- \n\nIt is **RECOMMENDED** to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
          },
        },
        {
          label: 'defaultContentType',
          insertText: '"defaultContentType": "$1",',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              "A string representing the default content type to use when encoding/decoding a message's payload. The value **MUST** be a specific media type (e.g. `application/json`). This value **MUST** be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectContentType) property is omitted.",
          },
        },
        {
          label: 'channels',
          insertText: '"channels": {\n  $1\n},',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\n ---- \n\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
          },
        },
        {
          label: 'servers',
          insertText: '"servers": [\n  $1\n],',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
          },
        },
        {
          label: 'components',
          insertText: '"components": {\n  $1\n},',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
          },
        },
        {
          label: 'tags',
          insertText: '"tags": [\n  $1\n],',
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
          insertText: '"externalDocs": {\n  $1\n},',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '#### External Documentation Object\n\n ---- \n\nnAllows referencing an external resource for extended documentation.\n\n ---- \n\n##### Fixed Fields\n\n ---- \n\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\n\n ---- \n\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
          },
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
          label: 'asyncapi',
          insertText: '"asyncapi": "$1",\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The version string signifies the version of the AsyncAPI Specification that the document complies to. The format for this string _must_ be `major`.`minor`.`patch`. The `patch` _may_ be suffixed by a hyphen and extra alphanumeric characters.\n\n ---- \n\nA `major`.`minor` shall be used to designate the AsyncAPI Specification version, and will be considered compatible with the AsyncAPI Specification specified by that `major`.`minor` version. The patch version will not be considered by tooling, making no distinction between `1.0.0` and `1.0.1`.\n\n ---- \n\nIn subsequent versions of the AsyncAPI Specification, care will be given such that increments of the `minor` version should not interfere with operations of tooling developed to a lower minor version. Thus a hypothetical `1.1.0` specification should be usable with tooling designed for `1.0.0`.\n\n',
          },
        },
        {
          label: 'id',
          insertText: '"id": "$1",\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\n ---- \n\nIt is **RECOMMENDED** to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
          },
        },
        {
          label: 'defaultContentType',
          insertText: '"defaultContentType": "$1",\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              "A string representing the default content type to use when encoding/decoding a message's payload. The value **MUST** be a specific media type (e.g. `application/json`). This value **MUST** be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectContentType) property is omitted.",
          },
        },
        {
          label: 'channels',
          insertText: '"channels": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\n ---- \n\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
          },
        },
        {
          label: 'servers',
          insertText: '"servers": [\n  $1\n],\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
          },
        },
        {
          label: 'components',
          insertText: '"components": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
          },
        },
        {
          label: 'tags',
          insertText: '"tags": [\n  $1\n],\n',
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
          insertText: '"externalDocs": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '#### External Documentation Object\n\n ---- \n\nnAllows referencing an external resource for extended documentation.\n\n ---- \n\n##### Fixed Fields\n\n ---- \n\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\n\n ---- \n\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
          },
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
          label: 'info',
          insertText: '"info": {\n  $1\n},\n',
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
          insertText: '"id": "$1",\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'This field represents a unique universal identifier of the [application](https://www.asyncapi.com/docs/specifications/v2.2.0#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\n ---- \n\nIt is **RECOMMENDED** to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
          },
        },
        {
          label: 'defaultContentType',
          insertText: '"defaultContentType": "$1",\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              "A string representing the default content type to use when encoding/decoding a message's payload. The value **MUST** be a specific media type (e.g. `application/json`). This value **MUST** be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObjectContentType) property is omitted.",
          },
        },
        {
          label: 'channels',
          insertText: '"channels": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers.\n\n ---- \n\nChannels are also known as "topics", "routing keys", "event types" or "paths".',
          },
        },
        {
          label: 'servers',
          insertText: '"servers": [\n  $1\n],\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
          },
        },
        {
          label: 'components',
          insertText: '"components": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Holds a set of reusable objects for different aspects of the AsyncAPI specification. All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.',
          },
        },
        {
          label: 'tags',
          insertText: '"tags": [\n  $1\n],\n',
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
          insertText: '"externalDocs": {\n  $1\n},\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '#### External Documentation Object\n\n ---- \n\nnAllows referencing an external resource for extended documentation.\n\n ---- \n\n##### Fixed Fields\n\n ---- \n\n**description** (`string`) : A short description of the target documentation. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.\n\n ---- \n\n**url** (`string`) : **Required.** The URL for the target documentation. Value MUST be in the format of a URL.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
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
    10,
    10,
    {
      contents: {
        kind: 'markdown',
        value:
          '***subscribe***: **operation**\n\nhttps://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObject\n\n#### Operation Object\n\nDescribes a publish or a subscribe operation. This provides a place to document how and why messages are sent and received. For example, an operation might describe a chat application use case where a user sends a text message to a group.\n\n##### Fixed Fields\n\nField Name | Type | Description\n---|:---:|---\n[operationId](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectOperationId) | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.\n[summary](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectSummary) | `string` | A short summary of what the operation is about.\n[description](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectDescription) | `string` | A verbose explanation of the operation. [CommonMark syntax](http://spec.commonmark.org/) can be used for rich text representation.\n[tags](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectTags) | [Tags Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#tagsObject) | A list of tags for API documentation control. Tags can be used for logical grouping of operations.\n[externalDocs](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectExternalDocs) | [External Documentation Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#externalDocumentationObject) | Additional external documentation for this operation.\n[bindings](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectBindings) | [Operation Bindings Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationBindingsObject) | A map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the operation.\n[traits](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectTraits) | [[Operation Trait Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationTraitObject) &#124; [Reference Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#referenceObject) ] | A list of traits to apply to the operation object. Traits MUST be merged into the operation object using the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) algorithm in the same order they are defined here.\n[message](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#operationObjectMessage) | [[Message Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#messageObject) &#124; [Reference Object](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#referenceObject)] | A definition of the message that will be published or received on this channel. `oneOf` is allowed here to specify multiple messages, however, **a message MUST be valid only against one of the referenced message objects.**\n\nThis object can be extended with [Specification Extensions](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md#specificationExtensions).\n\n##### Operation Object Example\n\n```json\n{\n  "operationId": "registerUser",\n  "summary": "Action to sign a user up.",\n  "description": "A longer description",\n  "tags": [\n    { "name": "user" },\n    { "name": "signup" },\n    { "name": "register" }\n  ],\n  "message": {\n    "headers": {\n      "type": "object",\n      "properties": {\n        "applicationInstanceId": {\n          "description": "Unique identifier for a given instance of the publishing application",\n          "type": "string"\n        }\n      }\n    },\n    "payload": {\n      "type": "object",\n      "properties": {\n        "user": {\n          "$ref": "#/components/schemas/userCreate"\n        },\n        "signup": {\n          "$ref": "#/components/schemas/signup"\n        }\n      }\n    }\n  },\n  "bindings": {\n    "amqp": {\n      "ack": false\n    },\n  },\n  "traits": [\n    { "$ref": "#/components/operationTraits/kafka" }\n  ]\n}\n```\n\n```yaml\noperationId: registerUser\nsummary: Action to sign a user up.\ndescription: A longer description\ntags:\n  - name: user\n  - name: signup\n  - name: register\nmessage:\n  headers:\n    type: object\n    properties:\n      applicationInstanceId:\n        description: Unique identifier for a given instance of the publishing application\n        type: string\n  payload:\n    type: object\n    properties:\n      user:\n        $ref: "#/components/schemas/userCreate"\n      signup:\n        $ref: "#/components/schemas/signup"\nbindings:\n  amqp:\n    ack: false\ntraits:\n  - $ref: "#/components/operationTraits/kafka"\n```\n',
      },
      range: { start: { line: 10, character: 6 }, end: { line: 10, character: 17 } },
    },
  ],
];

describe('apidom-ls-async', function () {
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [asyncJsonSchemavalidationProvider],
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

    assert.deepEqual(result, JSON.parse(specValidationExpected) as Diagnostic[]);

    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);

    assert.deepEqual(result, [
      {
        code: 0,
        message: '(Error ,,,)',
        range: {
          end: {
            character: 8,
            line: 15,
          },
          start: {
            character: 5,
            line: 15,
          },
        },
        severity: 1,
        source: 'syntax',
      },
      {
        code: 0,
        message: '(Error ::)',
        range: {
          end: {
            character: 16,
            line: 16,
          },
          start: {
            character: 14,
            line: 16,
          },
        },
        severity: 1,
        source: 'syntax',
      },
    ]);
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
              character: 12,
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

  it('test semantic highlighting async', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightAsync.json',
      'json',
      0,
      specHighlightAsync,
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
        1, 2, 10, 2, 0, 1, 2, 6, 4, 0, 1, 4, 9, 1, 0, 2, 2, 9, 25, 0, 1, 4, 6, 24, 0, 0, 9, 5, 11,
        0, 2, 2, 10, 28, 0, 1, 4, 3, 27, 0, 1, 6, 11, 5, 16, 1, 8, 9, 35, 64, 0, 11, 19, 32, 64, 1,
        8, 9, 35, 64, 1, 10, 9, 23, 0, 1, 12, 6, 35, 64, 0, 8, 8, 32, 64,
      ],
    });
  });

  it('test hover async', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightAsyncHover.json',
      'json',
      0,
      specHighlightAsync,
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

  it('test deref async', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specDeref.json', 'json', 0, specDeref);

    const result = await languageService.doDeref(doc, {
      format: Format.JSON,
      baseURI: derefBaseURI,
    });

    // calling with no baseURI, in this case deref service will try to use the first defined server URL as baseURI
    // const result = await languageService.doDeref(doc);
    assert.equal(result, specDereferenced.substr(0, specDereferenced.length - 1));
  });

  // eslint-disable-next-line consistent-return
  it('test parse json', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specFull.json', 'json', 0, specFull);

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
