// eslint-disable-next-line max-classes-per-file
import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionItem, Position } from 'vscode-languageserver-types';
import { toValue, Element } from '@swagger-api/apidom-core';
import { CompletionParams } from 'vscode-languageserver-protocol';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
  MergeStrategy,
  NamespaceVersion,
  ProviderMode,
  CompletionContext,
  CompletionProvider,
  CompletionProviderResult,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logLevel, logPerformance } from './test-utils';
import { isJsonDoc, isJsonDocSync } from '../src/utils/utils';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-ref-completion.yaml'))
  .toString();

class RefCompletionProvider implements CompletionProvider {
  /*
  returning `true` skips execution of any subsequent defined providers
   */
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  /*
  optional, if returning `ProviderMode.REF` only `doRefCompletion` function will be executed for each found ref element
  if not implemented or returning `ProviderMode.REF`, only `doCompletion` will be called once for the whole doc
   */
  // eslint-disable-next-line class-methods-use-this
  providerMode(): ProviderMode {
    return ProviderMode.REF;
  }

  /*
   optional
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  configure(settings: LanguageSettings): void {}

  /*
  method called only for completion triggered within a $ref value, if providerMode() returns ProviderMode.REF.
  In this case method `doCompletion` is NOT invoked.
  it is expected to return a list of completion items, and a `mergeStrategy` to integrate into items resolved by
  completion service and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  doRefCompletion(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
     the apidom element holding the ref
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    element: Element,
    /*
     the whole parsed doc as ApiDOM root element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    /*
     the content of `$ref` as string
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refValue: string,
    /*
     the `element` or `class` referenced by this ref, e.g. `schema` or `path-item`
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedElement: string,
    /*
     cursor position / params
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParamsOrPosition: CompletionParams | Position,
    /*
     completion items related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentCompletionItems: CompletionItem[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): CompletionProviderResult {
    console.log(toValue(element), referencedElement, refValue);
    // build completions
    const refs = this.legacyPotentialRefs(referencedElement);
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        completionList: {
          items: [],
          isIncomplete: false,
        },
      };
    }

    const valueQuotes = !isJsonDocSync(textDocument) ? "'" : '"';
    let i = 301;
    const items: CompletionItem[] = [];
    for (const p of refs) {
      const item: CompletionItem = {
        label: p,
        insertText: `${valueQuotes}${p}$1${valueQuotes}`,
        kind: 18,
        // documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
        // detail: 'replace with',
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      items.push(item);
      i += 1;
    }
    return {
      mergeStrategy: MergeStrategy.APPEND,
      completionList: {
        isIncomplete: false,
        items,
      },
    };
  }

  /*
  mandatory, name
   */
  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'RefProvider';
  }

  /*
    mandatory, the array of ns/version pairs supported
   */
  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      {
        namespace: 'openapi',
        version: '3.1.0',
      },
    ];
  }

  /*
   Mocks
   */

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private legacyPotentialRefs(ref: string): string[] {
    // logic here to get possible refs to add to completion items
    return [
      'http://example.com/#components/schemas/foo',
      'http://example.com/#components/schemas/bar',
    ];
  }
}

class AsyncRefCompletionProvider implements CompletionProvider {
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  providerMode(): ProviderMode {
    return ProviderMode.REF;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  configure(settings: LanguageSettings): void {}

  async doRefCompletion(
    textDocument: TextDocument,
    element: Element,
    api: Element,
    refValue: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedElement: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParamsOrPosition: CompletionParams | Position,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentCompletionItems: CompletionItem[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionProviderResult> {
    console.log(toValue(element), referencedElement, refValue);
    // build completions
    const refs = await this.legacyPotentialRefs(referencedElement);
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        completionList: {
          items: [],
          isIncomplete: false,
        },
      };
    }

    const valueQuotes = !(await isJsonDoc(textDocument)) ? "'" : '"';
    let i = 301;
    const items: CompletionItem[] = [];
    for (const p of refs) {
      const item: CompletionItem = {
        label: p,
        insertText: `${valueQuotes}${p}$1${valueQuotes}`,
        kind: 18,
        // documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
        // detail: 'replace with',
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      items.push(item);
      i += 1;
    }
    return {
      mergeStrategy: MergeStrategy.APPEND,
      completionList: {
        isIncomplete: false,
        items,
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'RefProvider';
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      {
        namespace: 'openapi',
        version: '3.1.0',
      },
    ];
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private async legacyPotentialRefs(ref: string): Promise<string[]> {
    // logic here to get possible refs to add to completion items
    return [
      'http://example.com/#components/schemas/foo',
      'http://example.com/#components/schemas/bar',
    ];
  }
}

class FullCompletionProvider implements CompletionProvider {
  /*
  returning `true` skips execution of any subsequent defined providers
   */
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  /*
  method invoked for any completion trigger; invoked if `providerMode` is not defined or returning ProviderMode.FULL
  In this case method `doRefValidation` is NOT invoked.
  it is expected to return a list of completion items, and a `mergeStrategy` to integrate into items resolved by
  completion service and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async doCompletion(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
     the apidom element holding the ref
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    element: Element,
    /*
     the whole parsed doc as ApiDOM root element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    /*
     cursor position / params
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionParamsOrPosition: CompletionParams | Position,
    /*
     completion items related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentCompletionItems: CompletionItem[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    completionContext?: CompletionContext,
  ): Promise<CompletionProviderResult> {
    const text = textDocument.getText();
    // build completions
    const refs = this.legacyPotentialRefs(
      text,
      'position' in completionParamsOrPosition
        ? completionParamsOrPosition.position
        : completionParamsOrPosition,
    );
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        completionList: {
          items: [],
          isIncomplete: false,
        },
      };
    }

    const valueQuotes = !(await isJsonDoc(textDocument)) ? "'" : '"';
    let i = 301;
    const items: CompletionItem[] = [];
    for (const p of refs) {
      const item: CompletionItem = {
        label: p,
        insertText: `${valueQuotes}${p}$1${valueQuotes}`,
        kind: 18,
        // documentation: textDocument.getText().substring(sm.offset, sm.endOffset),
        // detail: 'replace with',
        insertTextFormat: 2,
        sortText: `${String.fromCharCode(i)}`,
      };
      items.push(item);
      i += 1;
    }
    return {
      mergeStrategy: MergeStrategy.REPLACE,
      completionList: {
        isIncomplete: false,
        items,
      },
    };
  }

  /*
  mandatory, name
   */
  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'FullProvider';
  }

  /*
    mandatory, the array of ns/version pairs supported
   */
  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      {
        namespace: 'openapi',
        version: '3.1.0',
      },
    ];
  }

  /*
   Mocks
   */

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private legacyPotentialRefs(text: string, position: Position): string[] {
    // logic here to get possible refs to add to completion items
    // const line = position.line;
    // const char = position.character;
    return [
      'http://example.com/#components/schemas/foo',
      'http://example.com/#components/schemas/bar',
    ];
  }
}

describe('apidom-ls-completion-provider', function () {
  const refCompletionProvider = new RefCompletionProvider();
  const fullCompletionProvider = new FullCompletionProvider();
  const asyncRefCompletionProvider = new AsyncRefCompletionProvider();

  const contextRef: LanguageServiceContext = {
    metadata: metadata(),
    completionProviders: [refCompletionProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextAsyncRef: LanguageServiceContext = {
    metadata: metadata(),
    completionProviders: [asyncRefCompletionProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextFull: LanguageServiceContext = {
    metadata: metadata(),
    completionProviders: [fullCompletionProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test completion ref provider', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    let languageService: LanguageService = getLanguageService(contextAsyncRef);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const expected = [
        {
          label: '#/components/schemas/UserProfile',
          insertText: "'#/components/schemas/UserProfile$1'",
          kind: 18,
          documentation:
            'type: object\n      properties:\n        email:\n          type: string\n          x-nullable: true\n',
          insertTextFormat: 2,
          sortText: 'a',
          filterText: '',
        },
        {
          label: '#/components/schemas/User',
          insertText: "'#/components/schemas/User$1'",
          kind: 18,
          documentation:
            'type: object\n      properties:\n        id:\n          type: integer\n        name:\n          type: string\n        profile:\n          "$ref": "#/components/schemas/UserProfile"\n          summary: user profile reference summary\n          description: user profile reference description\n        profileExternalRef:\n          "$ref": "http://example.com/test.yaml#/components/schemas/UserProfile"',
          insertTextFormat: 2,
          sortText: 'b',
          filterText: '',
        },
        {
          label: '#/components/schemas/UserProfile/properties/email',
          insertText: "'#/components/schemas/UserProfile/properties/email$1'",
          kind: 18,
          documentation: 'type: string\n          x-nullable: true\n',
          insertTextFormat: 2,
          sortText: 'c',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/name',
          insertText: "'#/components/schemas/User/properties/name$1'",
          kind: 18,
          documentation: 'type: string',
          insertTextFormat: 2,
          sortText: 'd',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/id',
          insertText: "'#/components/schemas/User/properties/id$1'",
          kind: 18,
          documentation: 'type: integer',
          insertTextFormat: 2,
          sortText: 'e',
          filterText: '',
        },
        {
          label: 'http://example.com/#components/schemas/foo',
          insertText: "'http://example.com/#components/schemas/foo$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'ĭ',
          filterText: '',
        },
        {
          label: 'http://example.com/#components/schemas/bar',
          insertText: "'http://example.com/#components/schemas/bar$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'Į',
          filterText: '',
        },
      ] as CompletionItem[];

      const resultAsync = await languageService.doCompletion(
        docOpenapi,
        { line: 13, character: 24 },
        completionContext,
      );
      assert.deepEqual(resultAsync!.items, expected as CompletionItem[]);
      languageService.terminate();
      languageService = getLanguageService(contextRef);
      const result = await languageService.doCompletion(
        docOpenapi,
        { line: 13, character: 24 },
        completionContext,
      );
      assert.deepEqual(result!.items, expected as CompletionItem[]);
    } finally {
      languageService.terminate();
    }
  });

  it('test completion ref provider with indirect', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
      includeIndirectRefs: true,
    };
    let languageService: LanguageService = getLanguageService(contextAsyncRef);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const expected = [
        {
          label: '#/components/schemas/UserProfile',
          insertText: "'#/components/schemas/UserProfile$1'",
          kind: 18,
          documentation:
            'type: object\n      properties:\n        email:\n          type: string\n          x-nullable: true\n',
          insertTextFormat: 2,
          sortText: 'a',
          filterText: '',
        },
        {
          label: '#/components/schemas/User',
          insertText: "'#/components/schemas/User$1'",
          kind: 18,
          documentation:
            'type: object\n      properties:\n        id:\n          type: integer\n        name:\n          type: string\n        profile:\n          "$ref": "#/components/schemas/UserProfile"\n          summary: user profile reference summary\n          description: user profile reference description\n        profileExternalRef:\n          "$ref": "http://example.com/test.yaml#/components/schemas/UserProfile"',
          insertTextFormat: 2,
          sortText: 'b',
          filterText: '',
        },
        {
          label: '#/components/schemas/UserProfile/properties/email',
          insertText: "'#/components/schemas/UserProfile/properties/email$1'",
          kind: 18,
          documentation: 'type: string\n          x-nullable: true\n',
          insertTextFormat: 2,
          sortText: 'c',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/profileExternalRef',
          insertText: "'#/components/schemas/User/properties/profileExternalRef$1'",
          kind: 18,
          documentation: '"$ref": "http://example.com/test.yaml#/components/schemas/UserProfile"',
          insertTextFormat: 2,
          sortText: 'd',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/profile',
          insertText: "'#/components/schemas/User/properties/profile$1'",
          kind: 18,
          documentation:
            '"$ref": "#/components/schemas/UserProfile"\n          summary: user profile reference summary\n          description: user profile reference description',
          insertTextFormat: 2,
          sortText: 'e',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/name',
          insertText: "'#/components/schemas/User/properties/name$1'",
          kind: 18,
          documentation: 'type: string',
          insertTextFormat: 2,
          sortText: 'f',
          filterText: '',
        },
        {
          label: '#/components/schemas/User/properties/id',
          insertText: "'#/components/schemas/User/properties/id$1'",
          kind: 18,
          documentation: 'type: integer',
          insertTextFormat: 2,
          sortText: 'g',
          filterText: '',
        },
        {
          label: '#/paths/~1users/get/responses/201/content/application~1js...',
          insertText: "'#/paths/~1users/get/responses/201/content/application~1json/schema$1'",
          kind: 18,
          documentation: '"$ref": "#/components/schemas/User"',
          insertTextFormat: 2,
          sortText: 'h',
          filterText: '',
        },
        {
          label: 'http://example.com/#components/schemas/foo',
          insertText: "'http://example.com/#components/schemas/foo$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'ĭ',
          filterText: '',
        },
        {
          label: 'http://example.com/#components/schemas/bar',
          insertText: "'http://example.com/#components/schemas/bar$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'Į',
          filterText: '',
        },
      ] as CompletionItem[];

      const resultAsync = await languageService.doCompletion(
        docOpenapi,
        { line: 13, character: 24 },
        completionContext,
      );
      assert.deepEqual(resultAsync!.items, expected as CompletionItem[]);
      languageService.terminate();
      languageService = getLanguageService(contextRef);
      const result = await languageService.doCompletion(
        docOpenapi,
        { line: 13, character: 24 },
        completionContext,
      );
      assert.deepEqual(result!.items, expected as CompletionItem[]);
    } finally {
      languageService.terminate();
    }
  });

  it('test completion full provider', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    const languageService: LanguageService = getLanguageService(contextFull);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const result = await languageService.doCompletion(
        docOpenapi,
        { line: 13, character: 24 },
        completionContext,
      );
      const expected = [
        {
          label: 'http://example.com/#components/schemas/foo',
          insertText: "'http://example.com/#components/schemas/foo$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'ĭ',
        },
        {
          label: 'http://example.com/#components/schemas/bar',
          insertText: "'http://example.com/#components/schemas/bar$1'",
          kind: 18,
          insertTextFormat: 2,
          sortText: 'Į',
        },
      ] as CompletionItem[];
      assert.deepEqual(result!.items, expected as CompletionItem[]);
    } finally {
      languageService.terminate();
    }
  });
});
