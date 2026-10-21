import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';

import getLanguageService from '../src/apidom-language-service.ts';
import { LanguageService, ApidomCompletionItem } from '../src/apidom-language-types.ts';
import { AsyncAPI3 } from '../src/config/asyncapi/target-specs.ts';
import { metadata } from './metadata.ts';
import { logPerformance, logLevel } from './test-utils.ts';

describe('apidom-ls-asyncapi-3', function () {
  const languageService: LanguageService = getLanguageService({
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
  });

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('asyncapi 3.1 - Operation Trait title completion', async function () {
    const spec = `asyncapi: 3.1.0
info:
  title: Sample AsyncAPI
  version: '1.0.0'
components:
  operationTraits:
    trait1:
      
`;
    const doc: TextDocument = TextDocument.create('foo://bar/trait.yaml', 'yaml', 0, spec);

    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: Position.create(7, 6) },
      { maxNumberOfItems: 100 },
    );

    assert.deepEqual(
      result!.items.filter((item) => item.label === 'title'),
      [
        {
          label: 'title',
          insertText: 'title: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value: 'A human-friendly title for the operation.',
          },
          targetSpecs: AsyncAPI3,
        },
      ] as ApidomCompletionItem[],
    );
  });

  it('asyncapi 3.1 - Security Scheme scopes completion', async function () {
    const spec = `asyncapi: 3.1.0
info:
  title: Sample AsyncAPI
  version: '1.0.0'
components:
  securitySchemes:
    scheme1:
      type: openIdConnect
      
`;
    const doc: TextDocument = TextDocument.create('foo://bar/scheme.yaml', 'yaml', 0, spec);

    const result = await languageService.doCompletion(
      doc,
      { textDocument: doc, position: Position.create(8, 6) },
      { maxNumberOfItems: 100 },
    );

    assert.deepEqual(
      result!.items.filter((item) => item.label === 'scopes'),
      [
        {
          label: 'scopes',
          insertText: 'scopes: \n  - $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'Applies to `oauth2` or `openIdConnect` type. List of the needed scope names. An empty array means no scopes are needed.',
          },
          targetSpecs: AsyncAPI3,
        },
      ] as ApidomCompletionItem[],
    );
  });

  it('asyncapi 3.1 - Server externalDocs hover', async function () {
    const spec = `asyncapi: 3.1.0
info:
  title: Sample AsyncAPI
  version: '1.0.0'
servers:
  server1:
    host: example.com
    protocol: mqtt
    externalDocs:
      url: https://example.com/docs
`;
    const doc: TextDocument = TextDocument.create('foo://bar/server.yaml', 'yaml', 0, spec);

    const result = await languageService.doHover(doc, Position.create(8, 6));

    assert.deepEqual(result, {
      contents: {
        kind: 'markdown',
        value:
          '***externalDocs***: **externalDocumentation**\n\n[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.1.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.1.0#referenceObject)\n\\\n\\\nAdditional external documentation for this server.',
      },
      range: { start: { line: 8, character: 4 }, end: { line: 8, character: 16 } },
    });
  });
});
