// eslint-disable-next-line max-classes-per-file
import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver-types';
import { toValue, Element } from '@swagger-api/apidom-core';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
  MergeStrategy,
  NamespaceVersion,
  ProviderMode,
  HoverProvider,
  HoverProviderResult,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logLevel, logPerformance } from './test-utils';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-ref-hover.yaml'))
  .toString();

class RefHoverProvider implements HoverProvider {
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
  method called only for hover triggered within a $ref value, if providerMode() returns ProviderMode.REF.
  In this case method `doHover` is NOT invoked.
  it is expected to return an array of content lines, and a `mergeStrategy` to integrate into items resolved by
  hover service and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  doRefHover(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
      the position of cursor
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    position: Position,
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
     hover lines related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentHoverItems: string[],
  ): HoverProviderResult {
    console.log(toValue(element), refValue);
    // build completions
    const refs = this.legacyRefsHover(refValue);
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        hoverContent: [],
      };
    }
    return {
      mergeStrategy: MergeStrategy.APPEND,
      hoverContent: refs,
    };
  }

  /*
  mandatory, name
   */
  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'HoverRefProvider';
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
      {
        namespace: 'asyncapi',
        version: '2.1.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.2.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.3.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.4.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.5.0',
      },
    ];
  }

  /*
   Mocks
   */

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private legacyRefsHover(ref: string): string[] {
    // logic here to get possible refs to add to hover items
    const result = [];
    if (ref.startsWith('http') && ref.includes('domain')) {
      result.push(ref.replace('domain', 'updatedDomainURL'));
    }
    return result;
  }
}

class AsyncRefHoverProvider implements HoverProvider {
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
  method called only for hover triggered within a $ref value, if providerMode() returns ProviderMode.REF.
  In this case method `doHover` is NOT invoked.
  it is expected to return an array of content lines, and a `mergeStrategy` to integrate into items resolved by
  hover service and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async doRefHover(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
      the position of cursor
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    position: Position,
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
     hover lines related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentHoverItems: string[],
  ): Promise<HoverProviderResult> {
    console.log(toValue(element), refValue);
    // build completions
    const refs = await this.legacyRefsHover(refValue);
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        hoverContent: [],
      };
    }
    return {
      mergeStrategy: MergeStrategy.APPEND,
      hoverContent: refs,
    };
  }

  /*
  mandatory, name
   */
  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'HoverRefProvider';
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
      {
        namespace: 'asyncapi',
        version: '2.1.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.2.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.3.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.4.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.5.0',
      },
    ];
  }

  /*
   Mocks
   */

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private async legacyRefsHover(ref: string): Promise<string[]> {
    // logic here to get possible refs to add to hover items
    const result = [];
    if (ref.startsWith('http') && ref.includes('domain')) {
      result.push(ref.replace('domain', 'updatedDomainURL'));
    }
    return result;
  }
}

class FullHoverProvider implements HoverProvider {
  /*
  returning `true` skips execution of any subsequent defined providers
   */
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  /*
  method invoked for any hover trigger; invoked if providerMode() is not defined or returning ProviderMode.FULL.
  In this case method `doRefHover` is NOT invoked.
  it is expected to return an array of content lines, and a `mergeStrategy` to integrate into items resolved by
  hover service and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async doHover(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
      the position of cursor
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    position: Position,
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
     hover lines related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentHoverItems: string[],
  ): Promise<HoverProviderResult> {
    const text = textDocument.getText();
    // build completions
    const refs = this.legacyRefsHover(text, position);
    if (refs.length === 0) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        hoverContent: [],
      };
    }
    return {
      mergeStrategy: MergeStrategy.APPEND,
      hoverContent: refs,
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
      {
        namespace: 'asyncapi',
        version: '2.1.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.2.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.3.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.4.0',
      },
      {
        namespace: 'asyncapi',
        version: '2.5.0',
      },
    ];
  }

  /*
   Mocks
   */

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private legacyRefsHover(text: string, position: Position): string[] {
    // logic here to get possible refs to add to hover items
    // const line = position.line;
    // const char = position.character;
    const result = [];
    result.push('https://whatever');
    return result;
  }
}

describe('apidom-ls-hover-provider', function () {
  const refHoverProvider = new RefHoverProvider();
  const fullHoverProvider = new FullHoverProvider();
  const asyncRefHoverProvider = new AsyncRefHoverProvider();

  const contextRef: LanguageServiceContext = {
    metadata: metadata(),
    hoverProviders: [refHoverProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextAsyncRef: LanguageServiceContext = {
    metadata: metadata(),
    hoverProviders: [asyncRefHoverProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextFull: LanguageServiceContext = {
    metadata: metadata(),
    hoverProviders: [fullHoverProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test hover ref provider', async function () {
    let languageService: LanguageService = getLanguageService(contextAsyncRef);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const expected =
        '***$ref***: **string**\n\nhttps://example.com/test/updatedDomainURL/ext.json' as string;

      const resultAsync = await languageService.doHover(docOpenapi, { line: 11, character: 33 });
      // @ts-ignore
      assert.deepEqual(resultAsync!.contents!.value, expected as string);
      languageService.terminate();
      languageService = getLanguageService(contextRef);
      const result = await languageService.doHover(docOpenapi, { line: 11, character: 33 });
      // @ts-ignore
      assert.deepEqual(result!.contents!.value, expected as string);
    } finally {
      languageService.terminate();
    }
  });

  it('test hover full provider', async function () {
    const languageService: LanguageService = getLanguageService(contextFull);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const result = await languageService.doHover(docOpenapi, { line: 11, character: 33 });
      const expected = '***$ref***: **string**\n\nhttps://whatever' as string;
      console.log(JSON.stringify(result, null, 2));
      // @ts-ignore
      assert.deepEqual(result!.contents!.value, expected as string);
    } finally {
      languageService.terminate();
    }
  });
});
