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
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';

const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.yaml'))
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
});
