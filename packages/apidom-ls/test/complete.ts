import fs from 'fs';
import path from 'path';
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

const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.yaml'))
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

describe('apidom-ls-complete', function () {
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [asyncJsonSchemavalidationProvider],
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
            kind: 10,
            insertText: '"2.1.0$1"',
            filterText: '"2.0.0"',
            insertTextFormat: 2,
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
            kind: 10,
            insertText: '"2.2.0$1"',
            filterText: '"2.0.0"',
            insertTextFormat: 2,
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
          insertText: '"#/components/schemas/Tag$1"',
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
            newText: '"#/components/schemas/Tag$1"',
          },
        },
        {
          label: '#/components/messages/userSignUp/payload',
          insertText: '"#/components/messages/userSignUp/payload$1"',
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
            newText: '"#/components/messages/userSignUp/payload$1"',
          },
        },
        {
          label: '#/components/messages/userSignUp/headers',
          insertText: '"#/components/messages/userSignUp/headers$1"',
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
            newText: '"#/components/messages/userSignUp/headers$1"',
          },
        },
        {
          label: '#/components/schemas/Tag/properties/name',
          insertText: '"#/components/schemas/Tag/properties/name$1"',
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
            newText: '"#/components/schemas/Tag/properties/name$1"',
          },
        },
        {
          label: '#/components/schemas/Tag/properties/id',
          insertText: '"#/components/schemas/Tag/properties/id$1"',
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
            newText: '"#/components/schemas/Tag/properties/id$1"',
          },
        },
        {
          label: '#/components/schemas/Category/properties/name',
          insertText: '"#/components/schemas/Category/properties/name$1"',
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
            newText: '"#/components/schemas/Category/properties/name$1"',
          },
        },
        {
          label: '#/components/schemas/Category/properties/id',
          insertText: '"#/components/schemas/Category/properties/id$1"',
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
            newText: '"#/components/schemas/Category/properties/id$1"',
          },
        },
        {
          label: '#/components/messages/userSignUp/headers/properties/appli...',
          insertText:
            '"#/components/messages/userSignUp/headers/properties/applicationInstanceId$1"',
          kind: 18,
          documentation:
            'description: Unique identifier for a given instance of the publishing\n              application\n            type: string',
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
            newText:
              '"#/components/messages/userSignUp/headers/properties/applicationInstanceId$1"',
          },
        },
        {
          label: '#/channels/user/signin/subscribe/message/payload',
          insertText: '"#/channels/user/signin/subscribe/message/payload$1"',
          kind: 18,
          documentation:
            'type: object\n          properties:\n            user:\n              $ref: "#/components/schemas/Category"',
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
            newText: '"#/channels/user/signin/subscribe/message/payload$1"',
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
        kind: 10,
        insertText: 'userPassword$1',
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
            label: 'object',
            kind: 10,
            insertText: 'object$1',
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
            label: 'string',
            kind: 10,
            insertText: 'string$1',
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
            label: 'number',
            kind: 10,
            insertText: 'number$1',
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
});
