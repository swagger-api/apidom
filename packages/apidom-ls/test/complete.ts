import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionList, Position } from 'vscode-languageserver-types';

// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ApidomCompletionItem,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';
import { OpenAPI3 } from '../src/config/openapi/target-specs';
import { logPerformance, logLevel } from './test-utils';

const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.yaml'))
  .toString();

const specCompletionRoot = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async-root.yaml'))
  .toString();

const specCompletionRef = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async-ref.yaml'))
  .toString();

const specCompletionSecurity = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async-security.yaml'))
  .toString();

const specCompletionSchemaTypeArray = fs
  .readFileSync(
    path.join(__dirname, 'fixtures', 'sample-api-async-validation-schema-type-array.yaml'),
  )
  .toString();

const specCompletionServers = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async-server.yaml'))
  .toString();

const specCompletionRequired = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async-required.yaml'))
  .toString();

const specCompletionRequiredEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async-required-empty.yaml'))
  .toString();

const specCompletionRequiredJson = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async-required.json'))
  .toString();

describe('apidom-ls-complete', function () {
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [asyncJsonSchemavalidationProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('asyncapi / yaml - test completion', async function () {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'empty line in openapi 3.1 object value',
      0,
      9,
      {
        items: [
          {
            label: '2.1.0',
            insertText: '"2.1.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.1.0$1"',
            },
          },
          {
            label: '2.2.0',
            insertText: '"2.2.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.2.0$1"',
            },
          },
          {
            label: '2.3.0',
            insertText: '"2.3.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.3.0$1"',
            },
          },
          {
            label: '2.4.0',
            insertText: '"2.4.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.4.0$1"',
            },
          },
          {
            label: '2.5.0',
            insertText: '"2.5.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.5.0$1"',
            },
          },
          {
            label: '2.6.0',
            insertText: '"2.6.0$1"',
            kind: 12,
            insertTextFormat: 2,
            filterText: '"2.0.0"',
            textEdit: {
              range: {
                start: {
                  line: 0,
                  character: 10,
                },
                end: {
                  line: 0,
                  character: 17,
                },
              },
              newText: '"2.6.0$1"',
            },
          },
        ],
        isIncomplete: false,
      },
    ];

    const pos = Position.create(
      completionTestInputValue[1] as number,
      completionTestInputValue[2] as number,
    );
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result, completionTestInputValue[3] as CompletionList);
  });

  it('asyncapi / yaml - test completion root', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionRoot.json',
      'json',
      0,
      specCompletionRoot,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'empty line in root',
      7,
      0,
      {
        items: [
          {
            label: 'id',
            insertText: 'id: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Identifier](https://www.asyncapi.com/docs/reference/specification/v2.6.0#A2SIdString)\n\\\n\\\nIdentifier of the [application](https://www.asyncapi.com/docs/reference/specification/v2.6.0#definitionsApplication) the AsyncAPI document is defining. This field represents a unique universal identifier of the [application](#definitionsApplication) the AsyncAPI document is defining. It must conform to the URI format, according to [RFC3986](https://tools.ietf.org/html/rfc3986).\n\\\n\\\nIt is RECOMMENDED to use a [URN](https://tools.ietf.org/html/rfc8141) to globally and uniquely identify the application during long periods of time, even after it becomes unavailable or ceases to exist.',
            },
          },
          {
            label: 'servers',
            insertText: 'servers: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Servers Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serversObject)\n\\\n\\\nProvides connection details of servers. The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/reference/specification/v2.6.0#serverObject).',
            },
          },
          {
            label: 'defaultContentType',
            insertText: 'defaultContentType: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                "[Default Content Type](https://www.asyncapi.com/docs/reference/specification/v2.6.0#defaultContentTypeString)\n\\\n\\\nDefault content type to use when encoding/decoding a message's payload.\n\\\n\\\nIt's a string representing the default content type to use when encoding/decoding a message's payload. The value MUST be a specific media type (e.g. `application/json`). This value MUST be used by schema parsers when the [contentType](https://www.asyncapi.com/docs/reference/specification/v2.6.0#messageObjectContentType) property is omitted.\n\nIn case a message can't be encoded/decoded using this value, schema parsers MUST use their default content type.",
            },
          },
          {
            label: 'channels',
            insertText: 'channels: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Channels Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#channelsObject)\n\\\n\\\n**REQUIRED**. The available channels and messages for the API. Holds the relative paths to the individual channel and their operations. Channel paths are relative to servers. Channels are also known as "topics", "routing keys", "event types" or "paths".',
            },
          },
          {
            label: 'tags',
            insertText: 'tags: \n  - $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Tags Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#tagsObject)\n\\\n\\\nA list of tags used by the specification with additional metadata. Each tag name in the list **MUST** be unique.',
            },
          },
          {
            label: 'externalDocs',
            insertText: 'externalDocs: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#externalDocumentationObject)\n\\\n\\\nAdditional external documentation. Allows referencing an external resource for extended documentation.',
            },
          },
        ],
        isIncomplete: false,
      },
    ];

    const pos = Position.create(
      completionTestInputValue[1] as number,
      completionTestInputValue[2] as number,
    );
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result, completionTestInputValue[3] as CompletionList);
  });

  it('asyncapi / yaml - test ref completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionRef.json',
      'json',
      0,
      specCompletionRef,
    );

    const pos = Position.create(12, 21);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result, {
      items: [
        {
          label: '#/components/schemas/Tag',
          insertText: "'#/components/schemas/Tag$1'",
          kind: 18,
          documentation:
            'type: object\n      properties:\n        id:\n          type: integer\n          format: int64\n        name:\n          type: string',
          insertTextFormat: 2,
          sortText: 'a',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/schemas/Tag$1'",
          },
        },
        {
          label: '#/components/messages/userSignUp/payload',
          insertText: "'#/components/messages/userSignUp/payload$1'",
          kind: 18,
          documentation:
            'type: object\n        properties:\n          user:\n            $ref: "#/components/schemas/Category"\n          signup:\n            $ref: "#/components/schemas/Tag"\n',
          insertTextFormat: 2,
          sortText: 'c',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/messages/userSignUp/payload$1'",
          },
        },
        {
          label: '#/components/messages/userSignUp/headers',
          insertText: "'#/components/messages/userSignUp/headers$1'",
          kind: 18,
          documentation:
            'type: object\n        properties:\n          applicationInstanceId:\n            description: Unique identifier for a given instance of the publishing\n              application\n            type: string',
          insertTextFormat: 2,
          sortText: 'd',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/messages/userSignUp/headers$1'",
          },
        },
        {
          label: '#/components/schemas/Tag/properties/name',
          insertText: "'#/components/schemas/Tag/properties/name$1'",
          kind: 18,
          documentation: 'type: string',
          insertTextFormat: 2,
          sortText: 'e',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/schemas/Tag/properties/name$1'",
          },
        },
        {
          label: '#/components/schemas/Tag/properties/id',
          insertText: "'#/components/schemas/Tag/properties/id$1'",
          kind: 18,
          documentation: 'type: integer\n          format: int64',
          insertTextFormat: 2,
          sortText: 'f',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/schemas/Tag/properties/id$1'",
          },
        },
        {
          label: '#/components/schemas/Category/properties/name',
          insertText: "'#/components/schemas/Category/properties/name$1'",
          kind: 18,
          documentation: 'type: string',
          insertTextFormat: 2,
          sortText: 'g',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/schemas/Category/properties/name$1'",
          },
        },
        {
          label: '#/components/schemas/Category/properties/id',
          insertText: "'#/components/schemas/Category/properties/id$1'",
          kind: 18,
          documentation: 'type: integer\n          format: int64',
          insertTextFormat: 2,
          sortText: 'h',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/components/schemas/Category/properties/id$1'",
          },
        },
        {
          label: '#/channels/user~1signin/subscribe/message/payload',
          insertText: "'#/channels/user~1signin/subscribe/message/payload$1'",
          kind: 18,
          documentation:
            'type: object\n          properties:\n            user:\n              $ref: "#/components/schemas/Category"',
          insertTextFormat: 2,
          sortText: 'i',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText: "'#/channels/user~1signin/subscribe/message/payload$1'",
          },
        },
        {
          label: '#/components/messages/userSignUp/headers/properties/appli...',
          insertText:
            "'#/components/messages/userSignUp/headers/properties/applicationInstanceId$1'",
          kind: 18,
          documentation:
            'description: Unique identifier for a given instance of the publishing\n              application\n            type: string',
          insertTextFormat: 2,
          sortText: 'j',
          filterText: '"#/components/schemas/Category"',
          textEdit: {
            range: {
              start: {
                line: 12,
                character: 20,
              },
              end: {
                line: 12,
                character: 51,
              },
            },
            newText:
              "'#/components/messages/userSignUp/headers/properties/applicationInstanceId$1'",
          },
        },
      ],
      isIncomplete: false,
    } as CompletionList);
  });

  it('asyncapi / yaml - test security completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionSecurity.json',
      'json',
      0,
      specCompletionSecurity,
    );

    const pos = Position.create(60, 12);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        target: 'type',
        label: 'userPassword',
        insertText: 'userPassword$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'userPassword$1',
        },
      },
      {
        target: 'type',
        label: 'apiKey',
        insertText: 'apiKey$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'apiKey$1',
        },
      },
      {
        target: 'type',
        label: 'X509',
        insertText: 'X509$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'X509$1',
        },
      },
      {
        target: 'type',
        label: 'symmetricEncryption',
        insertText: 'symmetricEncryption$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'symmetricEncryption$1',
        },
      },
      {
        target: 'type',
        label: 'asymmetricEncryption',
        insertText: 'asymmetricEncryption$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'asymmetricEncryption$1',
        },
      },
      {
        target: 'type',
        label: 'httpApiKey',
        insertText: 'httpApiKey$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'httpApiKey$1',
        },
      },
      {
        target: 'type',
        label: 'http',
        insertText: 'http$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'http$1',
        },
      },
      {
        target: 'type',
        label: 'oauth2',
        insertText: 'oauth2$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'oauth2$1',
        },
      },
      {
        target: 'type',
        label: 'openIdConnect',
        insertText: 'openIdConnect$1',
        kind: 12,
        insertTextFormat: 2,
        filterText: 'scramSha256',
        textEdit: {
          range: {
            start: {
              line: 60,
              character: 12,
            },
            end: {
              line: 60,
              character: 23,
            },
          },
          newText: 'openIdConnect$1',
        },
      },
    ] as ApidomCompletionItem[]);
  });

  it('asyncapi / yaml - test schema type array completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionSchemaTypeArray.json',
      'json',
      0,
      specCompletionSchemaTypeArray,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'before schema type defined as array',
      9,
      16,
      {
        items: [
          {
            target: 'type',
            label: 'null',
            insertText: 'null$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            targetSpecs: [
              { namespace: 'asyncapi', version: '2.0.0' },
              { namespace: 'asyncapi', version: '2.1.0' },
              { namespace: 'asyncapi', version: '2.2.0' },
              { namespace: 'asyncapi', version: '2.3.0' },
              { namespace: 'asyncapi', version: '2.4.0' },
              { namespace: 'asyncapi', version: '2.5.0' },
              { namespace: 'asyncapi', version: '2.6.0' },
              { namespace: 'openapi', version: '3.1.0' },
            ],
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'null$1',
            },
          },
          {
            target: 'type',
            label: 'boolean',
            insertText: 'boolean$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'boolean$1',
            },
          },
          {
            target: 'type',
            label: 'object',
            insertText: 'object$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'object$1',
            },
          },
          {
            target: 'type',
            label: 'array',
            insertText: 'array$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'array$1',
            },
          },
          {
            target: 'type',
            label: 'number',
            insertText: 'number$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'number$1',
            },
          },
          {
            target: 'type',
            label: 'string',
            insertText: 'string$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'string$1',
            },
          },
          {
            target: 'type',
            label: 'integer',
            insertText: 'integer$1',
            kind: 12,
            insertTextFormat: 2,
            filterText: '[integer, string]',
            textEdit: {
              range: {
                start: {
                  line: 9,
                  character: 16,
                },
                end: {
                  line: 9,
                  character: 33,
                },
              },
              newText: 'integer$1',
            },
          },
        ],
        isIncomplete: false,
      },
    ];

    const pos = Position.create(
      completionTestInputValue[1] as number,
      completionTestInputValue[2] as number,
    );

    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result, completionTestInputValue[3] as CompletionList);
  });

  it('asyncapi / yaml - test server security completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionServers.json',
      'yaml',
      0,
      specCompletionServers,
    );

    const pos = Position.create(18, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'user_pass',
        insertText: 'user_pass: \n  - $1\n',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
      },
      {
        label: 'user_pass_other',
        insertText: 'user_pass_other: \n  - $1\n',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
      },
    ] as ApidomCompletionItem[]);
  });

  it('asyncapi / yaml - test schema required completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionRequired.json',
      'yaml',
      0,
      specCompletionRequired,
    );

    const pos = Position.create(9, 10);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'bar',
        insertText: 'bar$1',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
        filterText: 'foo',
        textEdit: {
          range: {
            start: {
              line: 9,
              character: 10,
            },
            end: {
              line: 9,
              character: 13,
            },
          },
          newText: 'bar$1',
        },
      },
    ] as ApidomCompletionItem[]);
  });

  it('asyncapi / yaml - test schema empty required completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionRequiredEmpty.json',
      'yaml',
      0,
      specCompletionRequiredEmpty,
    );

    const pos = Position.create(9, 10);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'foo',
        insertText: 'foo$1',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
        filterText: '',
      },
      {
        label: 'bar',
        insertText: 'bar$1',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
        filterText: '',
      },
    ] as ApidomCompletionItem[]);
  });

  it('asyncapi / json - test schema required completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specCompletionRequiredJson.json',
      'json',
      0,
      specCompletionRequiredJson,
    );

    const pos = Position.create(7, 10);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'firstName',
        insertText: '"firstName"$1',
        kind: 12,
        documentation: '',
        insertTextFormat: 2,
      },
    ] as ApidomCompletionItem[]);
  });

  it('asyncapi / yaml - test partial completion', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'async-info.yaml')).toString();

    const doc: TextDocument = TextDocument.create('foo://bar/async-info.yaml', 'yaml', 0, spec);

    const pos = Position.create(2, 5);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'title',
        insertText: 'title: $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: {
          kind: 'markdown',
          value: '**REQUIRED.** The title of the application.',
        },
        preselect: true,
        filterText: 'tit',
        textEdit: {
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 5,
            },
          },
          newText: 'title: $1',
        },
      },
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
        filterText: 'tit',
        textEdit: {
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 5,
            },
          },
          newText: 'description: $1',
        },
      },
      {
        label: 'termsOfService',
        insertText: 'termsOfService: $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: {
          kind: 'markdown',
          value:
            'A URL to the Terms of Service for the API. This MUST be in the form of an absolute URL.',
        },
        filterText: 'tit',
        textEdit: {
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 5,
            },
          },
          newText: 'termsOfService: $1',
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
            '[Contact Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#contactObject)\n\\\n\\\nContact information for the exposed API.',
        },
        filterText: 'tit',
        textEdit: {
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 5,
            },
          },
          newText: 'contact: \n  $1',
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
            '[License Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#licenseObject)\n\\\n\\\nLicense information for the exposed API.',
        },
        filterText: 'tit',
        textEdit: {
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 5,
            },
          },
          newText: 'license: \n  $1',
        },
      },
    ] as ApidomCompletionItem[]);
  });

  it('openapi / yaml - test LSP provided filter', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      enableLSPFilter: true,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'openapi-complete-filter.yaml'))
      .toString();

    const doc: TextDocument = TextDocument.create(
      'foo://bar/penapi-complete-filter.yaml',
      'yaml',
      0,
      spec,
    );

    const pos = Position.create(4, 8);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: 'responses',
        insertText: 'responses: \n  $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: {
          kind: 'markdown',
          value:
            '[Responses Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#responsesObject)\n\\\n\\\nThe list of possible responses as they are returned from executing this operation.',
        },
        targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
        filterText: 'se',
        textEdit: {
          range: { start: { line: 4, character: 6 }, end: { line: 4, character: 8 } },
          newText: 'responses: \n  $1',
        },
      },
      {
        label: 'security',
        insertText: 'security: \n  - $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: {
          kind: 'markdown',
          value:
            '[[Security Requirement Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nA declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oasSecurity). To remove a top-level security declaration, an empty array can be used.',
        },
        targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
        preselect: true,
        filterText: 'se',
        textEdit: {
          range: { start: { line: 4, character: 6 }, end: { line: 4, character: 8 } },
          newText: 'security: \n  - $1',
        },
      },
      {
        label: 'servers',
        insertText: 'servers: \n  - $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: {
          kind: 'markdown',
          value:
            '[[Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject)]\n\\\n\\\nAn alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.',
        },
        targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
        preselect: true,
        filterText: 'se',
        textEdit: {
          range: { start: { line: 4, character: 6 }, end: { line: 4, character: 8 } },
          newText: 'servers: \n  - $1',
        },
      },
    ] as ApidomCompletionItem[]);
  });

  it('openapi / yaml - test callback completion issue 2356', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const spec = fs
      .readFileSync(path.join(__dirname, 'fixtures', 'completion', 'oas', 'issue-2356.yaml'))
      .toString();

    const doc: TextDocument = TextDocument.create('foo://bar/issue-2356.yaml', 'yaml', 0, spec);

    const pos = Position.create(7, 10);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );
    assert.deepEqual(result!.items, [
      {
        label: '$ref',
        insertText: '\\$ref: $1',
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'A reference to a Callback.' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$url',
        insertText: "'\\$url': \n  $1",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request URL' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$method',
        insertText: "'\\$method': \n  $1",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'HTTP Method' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$statusCode',
        insertText: "'\\$statusCode': \n  $1",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Status Code' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$request.path...',
        insertText: "'\\$request.path.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request Path' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$request.query...',
        insertText: "'\\$request.query.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request Query' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$request.header...',
        insertText: "'\\$request.header.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request Header' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$request.body',
        insertText: "'\\$request.body': \n  $1",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request Body' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$request.body#/...',
        insertText: "'\\$request.body#/.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Request Body..' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$response.path...',
        insertText: "'\\$response.path.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Response Path' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$response.query...',
        insertText: "'\\$response.query.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Response Query' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$response.header...',
        insertText: "'\\$response.header.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Response Header' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$response.body',
        insertText: "'\\$response.body': \n  $1",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Response Body' },
        targetSpecs: OpenAPI3,
      },
      {
        label: '$response.body#/...',
        insertText: "'\\$response.body#/.$1': ",
        kind: 14,
        insertTextFormat: 2,
        documentation: { kind: 'markdown', value: 'Response Body..' },
        targetSpecs: OpenAPI3,
      },
    ] as ApidomCompletionItem[]);
  });
});
