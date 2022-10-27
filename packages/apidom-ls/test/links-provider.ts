import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentLink } from 'vscode-languageserver-types';
import { Element } from 'minim';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
  LinksContext,
  LinksModifierFunction,
  LinksProviderResult,
  MergeStrategy,
  NamespaceVersion,
  ProviderMode,
  LinksProvider,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logPerformance, logLevel } from './test-utils';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'oas31-petstore.yaml'))
  .toString();

class RefLinksProvider implements LinksProvider {
  /*
  returning `true` skips execution of any subsequent defined providers
   */
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  /*
  optional, if returning `ProviderMode.REF` only `doRefValidation` function will be executed for each found ref element
  if not implemented or returning `ProviderMode.REF`, only `doValidation` will be called once for the whole doc
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
  method called for each traversed reference, if providerMode() returns ProviderMode.REF.
  In this case method `doValidation` is NOT invoked.
  it is expected to return a list of diagnostics, and a `mergeStrategy` to integrate into diagnostics resolved by
  linter and/or other providers.
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async doRefLinks(
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
    api: Element,
    /*
     the apidom element holding the ref
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentRefLinks: DocumentLink[],
    /*
     the apidom element holding the ref
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    linksContext?: LinksContext,
  ): Promise<LinksProviderResult> {
    for (const link of currentRefLinks) {
      if (link.target && link.target.startsWith('https://github.com')) {
        link.target = link.target.replace('github.com', 'onprem.com');
      }
    }
    return {
      mergeStrategy: MergeStrategy.IGNORE,
      links: [],
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
}

describe('apidom-ls-links', function () {
  const func: LinksModifierFunction = (value) => {
    if (value.startsWith('https://github.com')) {
      return value.replace('github.com', 'onprem.com');
    }
    return value;
  };

  const linksContext: LinksContext = {
    maxNumberOfLinks: 100,
    // enableTrivialLinkDiscovery: true,
    modifierFunction: func,
  };

  const context: LanguageServiceContext = {
    metadata: metadata(),
    performanceLogs: logPerformance,
    logLevel,
    linksContext,
  };

  it('test links modifier', async function () {
    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/oas31-petstore.yaml',
      'yaml',
      0,
      specOpenapi,
    );

    const languageService: LanguageService = getLanguageService(context);

    const result = await languageService.doLinks(docOpenapi); // , linksContext);
    const expected: DocumentLink[] = [
      {
        target: 'https://onprem.com/foo.json#/components/schemas/Pet',
        range: {
          start: {
            line: 65,
            character: 22,
          },
          end: {
            line: 65,
            character: 75,
          },
        },
      },
    ];
    assert.deepEqual(result, expected as DocumentLink[]);
    languageService.terminate();
  });

  it('test links provider', async function () {
    const refLinksProvider = new RefLinksProvider();
    const providerContext: LanguageServiceContext = {
      metadata: metadata(),
      performanceLogs: logPerformance,
      linksProviders: [refLinksProvider],
      logLevel,
    };

    // valid spec
    const docOpenapi: TextDocument = TextDocument.create(
      'foo://bar/oas31-petstore.yaml',
      'yaml',
      0,
      specOpenapi,
    );

    const languageService: LanguageService = getLanguageService(providerContext);

    const result = await languageService.doLinks(docOpenapi);
    const expected: DocumentLink[] = [
      {
        target: 'https://onprem.com/foo.json#/components/schemas/Pet',
        range: {
          start: {
            line: 65,
            character: 22,
          },
          end: {
            line: 65,
            character: 75,
          },
        },
      },
    ];
    assert.deepEqual(result, expected as DocumentLink[]);
    languageService.terminate();
  });
});
