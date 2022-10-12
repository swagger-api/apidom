// eslint-disable-next-line max-classes-per-file
import fs from 'node:fs';
import { assert } from 'chai';
import path from 'node:path';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver-types';
import { Element } from '@swagger-api/apidom-core';
import { isOpenApi3_1Element, OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import getLanguageService from '../src/apidom-language-service';
import {
  LanguageService,
  LanguageServiceContext,
  LanguageSettings,
  LinterMetaData,
  MergeStrategy,
  NamespaceVersion,
  ProviderMode,
  ValidationContext,
  ValidationProvider,
  ValidationProviderResult,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { logLevel, logPerformance } from './test-utils';
import { getSourceMap } from '../src/utils/utils';

const specOpenapi = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-ref.yaml'))
  .toString();

const isOpenApi31 = (element: Element): element is OpenApi3_1Element => {
  return isOpenApi3_1Element(element);
};

class RefValidationProvider implements ValidationProvider {
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
  doRefValidation(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
     the whole parsed doc as ApiDOM root element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    /*
     the apidom element holding the ref
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    element: Element,
    /*
     the `element` or `class` referenced by this ref, e.g. `schema` or `path-item`
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    referencedElement: string,
    /*
     the content of `$ref` as string
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refValue: string,
    /*
     diagnostics related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentDiagnostics: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): ValidationProviderResult {
    // check ref value for existence
    if (this.isRefAccessible(refValue)) {
      return {
        mergeStrategy: MergeStrategy.IGNORE,
        diagnostics: [],
      };
    }
    // get the "sourcmap" of the node (position within the document
    const sourceMap = getSourceMap(element);
    // build the range in the document to be marked with the error
    const location = { offset: sourceMap.offset, length: sourceMap.length };
    const range = Range.create(
      textDocument.positionAt(location.offset),
      textDocument.positionAt(location.offset + location.length),
    );
    // use some error code
    const code = `${location.offset.toString()}-${location.length.toString()}`;
    // create the diagnostic to be sent to the editor
    const diagnostic = Diagnostic.create(
      range,
      'reference to domain not found',
      DiagnosticSeverity.Error,
      code,
      this.name(),
    );

    // optional, adding a quick fix
    diagnostic.data = {
      quickFix: [],
    } as LinterMetaData;

    for (const r of this.getPotentialRefs(refValue)) {
      // @ts-ignore
      diagnostic.data.quickFix.push({
        message: `update to ${r}`,
        action: 'updateValue',
        functionParams: [r],
      });
    }
    const quickFixesMap = {};
    // @ts-ignore
    quickFixesMap[code] = diagnostic.data.quickFix;

    return {
      mergeStrategy: MergeStrategy.APPEND,
      diagnostics: [diagnostic],
      quickFixes: quickFixesMap,
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
  private isRefAccessible(ref: string): boolean {
    // logic here to check
    return false;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private getPotentialRefs(ref: string): string[] {
    // logic here to add a set of existing refs as quick fix for the incorrect one
    return [
      'http://example.com/#components/schemas/foo',
      'http://example.com/#components/schemas/bar',
    ];
  }
}

class FullValidationProvider implements ValidationProvider {
  /*
  returning `true` skips execution of any subsequent defined providers
   */
  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  /*
  method called once for the whole document; invoked if `providerMode` is not defined or returning ProviderMode.FULL
  In this case method `doRefValidation` is NOT invoked.
  it is expected to return a list of diagnostics, and a `mergeStrategy` to integrate into diagnostics resolved by
  linter and/or other providers.
 */
  // eslint-disable-next-line class-methods-use-this
  doValidation(
    /*
     the whole document, get content with `textDocument.getText()`
     see https://github.com/microsoft/vscode-languageserver-node/blob/main/textDocument/src/main.ts#L116=
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    textDocument: TextDocument,
    /*
     the whole parsed doc as ApiDOM root element
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    /*
     diagnostics related to this ref processed so far
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentDiagnostics: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<ValidationProviderResult> {
    const quickFixes = {};
    const diagnostics = this.legacyValidation(textDocument.getText(), textDocument, quickFixes);
    const mergeStrategy = diagnostics.length > 0 ? MergeStrategy.APPEND : MergeStrategy.IGNORE;

    /*
    we can also semantically access elements in the apidom tree:
    */
    if (isOpenApi31(api)) {
      const contactName = api.info?.contact?.name?.toValue();
      // eslint-disable-next-line no-console
      console.log({ contactName });
    }

    return Promise.resolve({
      mergeStrategy,
      diagnostics,
      quickFixes,
    });
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
  private legacyValidation(doc: string, textDocument: TextDocument, quickFixes: any): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    // some logic to get errors and location in docs
    const legacyResults = [
      {
        markerOffset: 12,
        markerLength: 3,
        severity: 1,
        code: 12,
        text: 'reference to domain not found',
        refValue: 'http://example.com/#foo',
      },
      {
        markerOffset: 18,
        markerLength: 4,
        severity: 1,
        code: 12,
        text: 'reference to domain not found',
        refValue: 'http://example.com/#bar',
      },
    ];
    for (const result of legacyResults) {
      const location = { offset: result.markerOffset, length: result.markerLength };
      const range = Range.create(
        textDocument.positionAt(location.offset),
        textDocument.positionAt(location.offset + location.length),
      );
      // use some error code
      const { code } = result;
      // create the diagnostic to be sent to the editor
      const diagnostic = Diagnostic.create(
        range,
        result.text,
        DiagnosticSeverity.Error,
        code,
        this.name(),
      );

      // optional, adding a quick fix
      diagnostic.data = {
        quickFix: [],
      } as LinterMetaData;
      for (const r of this.getPotentialRefs(result.refValue)) {
        // @ts-ignore
        diagnostic.data.quickFix.push({
          message: `update to ${r}`,
          action: 'updateValue',
          functionParams: [r],
        });
      }
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      quickFixes[code] = diagnostic.data.quickFix;
      diagnostics.push(diagnostic);
    }

    return diagnostics;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  private getPotentialRefs(ref: string): string[] {
    // logic here to add a set of existing refs as quick fix for the incorrect one
    return [
      'http://example.com/#components/schemas/foo',
      'http://example.com/#components/schemas/bar',
    ];
  }
}

describe('apidom-ls-validation-provider-ref', function () {
  const refValidationProvider = new RefValidationProvider();
  const fullValidationProvider = new FullValidationProvider();

  const contextRef: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [refValidationProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  const contextFull: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [fullValidationProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  it('test validation ref provider', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };
    const languageService: LanguageService = getLanguageService(contextRef);

    try {
      // valid spec
      const docOpenapi: TextDocument = TextDocument.create(
        'foo://bar/openapi.yaml',
        'specOpenapi',
        0,
        specOpenapi,
      );

      const result = await languageService.doValidation(docOpenapi, validationContext);
      const expected = [
        {
          range: {
            start: {
              line: 0,
              character: 0,
            },
            end: {
              line: 0,
              character: 5,
            },
          },
          message: "should always have a 'info' section",
          severity: 1,
          code: 7010101,
          source: 'apilint',
          data: {
            quickFix: [
              {
                action: 'addChild',
                message: "add 'info' section",
                snippetJson: '"info": {\n  \n  },\n',
                snippetYaml: 'info: \n  \n',
              },
            ],
          },
        },
        {
          range: {
            start: {
              line: 11,
              character: 18,
            },
            end: {
              line: 11,
              character: 52,
            },
          },
          message: 'reference to domain not found',
          severity: 1,
          code: '193-34',
          source: 'RefProvider',
          data: {
            quickFix: [
              {
                message: 'update to http://example.com/#components/schemas/foo',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/foo'],
              },
              {
                message: 'update to http://example.com/#components/schemas/bar',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/bar'],
              },
            ],
          },
        },
        {
          range: {
            start: {
              line: 15,
              character: 18,
            },
            end: {
              line: 15,
              character: 80,
            },
          },
          message: 'reference to domain not found',
          severity: 1,
          code: '382-62',
          source: 'RefProvider',
          data: {
            quickFix: [
              {
                message: 'update to http://example.com/#components/schemas/foo',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/foo'],
              },
              {
                message: 'update to http://example.com/#components/schemas/bar',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/bar'],
              },
            ],
          },
        },
        {
          range: {
            start: {
              line: 42,
              character: 24,
            },
            end: {
              line: 42,
              character: 51,
            },
          },
          message: 'reference to domain not found',
          severity: 1,
          code: '1072-27',
          source: 'RefProvider',
          data: {
            quickFix: [
              {
                message: 'update to http://example.com/#components/schemas/foo',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/foo'],
              },
              {
                message: 'update to http://example.com/#components/schemas/bar',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/bar'],
              },
            ],
          },
        },
      ] as Diagnostic[];
      assert.deepEqual(result, expected as Diagnostic[]);
    } finally {
      languageService.terminate();
    }
  });

  it('test validation full provider', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
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

      const result = await languageService.doValidation(docOpenapi, validationContext);
      const expected = [
        {
          range: {
            start: {
              line: 0,
              character: 0,
            },
            end: {
              line: 0,
              character: 5,
            },
          },
          message: "should always have a 'info' section",
          severity: 1,
          code: 7010101,
          source: 'apilint',
          data: {
            quickFix: [
              {
                action: 'addChild',
                message: "add 'info' section",
                snippetJson: '"info": {\n  \n  },\n',
                snippetYaml: 'info: \n  \n',
              },
            ],
          },
        },
        {
          range: {
            start: {
              line: 0,
              character: 12,
            },
            end: {
              line: 1,
              character: 0,
            },
          },
          message: 'reference to domain not found',
          severity: 1,
          code: 12,
          source: 'FullProvider',
          data: {
            quickFix: [
              {
                message: 'update to http://example.com/#components/schemas/foo',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/foo'],
              },
              {
                message: 'update to http://example.com/#components/schemas/bar',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/bar'],
              },
            ],
          },
        },
        {
          range: {
            start: {
              line: 1,
              character: 3,
            },
            end: {
              line: 1,
              character: 7,
            },
          },
          message: 'reference to domain not found',
          severity: 1,
          code: 12,
          source: 'FullProvider',
          data: {
            quickFix: [
              {
                message: 'update to http://example.com/#components/schemas/foo',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/foo'],
              },
              {
                message: 'update to http://example.com/#components/schemas/bar',
                action: 'updateValue',
                functionParams: ['http://example.com/#components/schemas/bar'],
              },
            ],
          },
        },
      ] as Diagnostic[];
      assert.deepEqual(result, expected as Diagnostic[]);
    } finally {
      languageService.terminate();
    }
  });
});
