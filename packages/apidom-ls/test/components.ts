import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
} from '../src/apidom-language-types.ts';
import { AsyncAPI3 } from '../src/config/asyncapi/target-specs.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const specComponentsFields = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'asyncapi3', 'components-fields.yaml'))
  .toString();

describe('asyncapi components test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  after(function () {
    languageService.terminate();
  });

  it('complete components operations field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const operationsItem = result?.items.find((item) => item.label === 'operations');
    assert.deepEqual(operationsItem, {
      label: 'operations',
      insertText: 'operations: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'Map[`string`, [Operation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationObject).',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete components replies field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const repliesItem = result?.items.find((item) => item.label === 'replies');
    assert.deepEqual(repliesItem, {
      label: 'replies',
      insertText: 'replies: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'Map[`string`, [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Reply Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject).',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete components replyAddresses field (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const replyAddressesItem = result?.items.find((item) => item.label === 'replyAddresses');
    assert.deepEqual(replyAddressesItem, {
      label: 'replyAddresses',
      insertText: 'replyAddresses: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'Map[`string`, [Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Operation Reply Address Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject).',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });

  it('complete components tags and externalDocs fields (AsyncAPI 3)', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };

    const doc: TextDocument = TextDocument.create(
      'foo://bar/components-fields.yaml',
      'yaml',
      0,
      specComponentsFields,
    );

    const pos = Position.create(2, 2);
    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: pos },
      completionContext,
    );

    const tagsItem = result?.items.find((item) => item.label === 'tags');
    assert.deepEqual(tagsItem, {
      label: 'tags',
      insertText: 'tags: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'Map[`string`, [Tag Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [Tag Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagObject).',
      },
      targetSpecs: AsyncAPI3,
    } as any);

    const externalDocsItem = result?.items.find((item) => item.label === 'externalDocs');
    assert.deepEqual(externalDocsItem, {
      label: 'externalDocs',
      insertText: 'externalDocs: \n  $1',
      kind: 14,
      insertTextFormat: 2,
      documentation: {
        kind: 'markdown',
        value:
          'Map[`string`, [External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn object to hold reusable [External Documentation Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject).',
      },
      targetSpecs: AsyncAPI3,
    } as any);
  });
});
