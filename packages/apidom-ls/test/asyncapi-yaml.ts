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

// @ts-ignore
import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { Asyncapi20JsonSchemaValidationProvider } from '../src/services/validation/providers/asyncapi-20-json-schema-validation-provider';
import { logPerformance, logLevel } from './test-utils';

const spec = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-async-validation-2.0.0.yaml'))
  .toString();
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion-async.yaml'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error-async.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightAsync = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async.yaml'))
  .toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const specHighlightNoQuotes = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-async-noquotes.yaml'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    2,
    2,
    {
      items: [
        {
          label: 'license',
          insertText: 'license: \n  $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              '[License Object](https://www.asyncapi.com/docs/specifications/v2.2.0#licenseObject) - License information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
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
        },
        {
          label: 'termsOfService',
          insertText: 'termsOfService: $1',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value: 'A URL to the Terms of Service for the API. MUST be in the format of a URL.',
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
              '[Contact Object](https://www.asyncapi.com/docs/specifications/v2.2.0#contactObject) - Contact information for the exposed API.\n\n ---- \n\nThis object can be extended with [Specification Extensions](https://www.asyncapi.com/docs/specifications/v2.2.0#specificationExtensions).',
          },
        },
      ],
      isIncomplete: false,
    },
  ],
  [
    'asyncapi key start',
    0,
    0,
    {
      items: [
        {
          label: 'asyncapi',
          insertText: 'asyncapi: $1\n',
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
          insertText: 'id: $1\n',
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
          insertText: 'defaultContentType: $1\n',
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
          insertText: 'channels: \n  $1\n',
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
          insertText: 'servers: \n  - $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
          },
        },
        {
          label: 'tags',
          insertText: 'tags: \n  - $1\n',
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
          insertText: 'externalDocs: \n  $1\n',
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
    1,
    0,
    {
      items: [
        {
          label: 'info',
          insertText: 'info: \n  $1\n',
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
          insertText: 'id: $1\n',
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
          insertText: 'defaultContentType: $1\n',
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
          insertText: 'channels: \n  $1\n',
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
          insertText: 'servers: \n  - $1\n',
          kind: 14,
          insertTextFormat: 2,
          documentation: {
            kind: 'markdown',
            value:
              'The Servers Object is a map of [Server Objects](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject).',
          },
        },
        {
          label: 'tags',
          insertText: 'tags: \n  - $1\n',
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
          insertText: 'externalDocs: \n  $1\n',
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
    8,
    10,
    {
      contents: {
        kind: 'markdown',
        value:
          '***subscribe***: **operation**\n\n[Operation Object](https://www.asyncapi.com/docs/specifications/v2.2.0#operationObject)\n\n ---- \n\nA definition of the SUBSCRIBE operation, which defines the messages produced by the application and sent to the channel.',
      },
      range: { start: { line: 8, character: 4 }, end: { line: 8, character: 13 } },
    },
  ],
];

describe('apidom-ls-async-yaml', function () {
  const asyncJsonSchemavalidationProvider = new Asyncapi20JsonSchemaValidationProvider();

  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [asyncJsonSchemavalidationProvider],
    performanceLogs: logPerformance,
    logLevel,
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

    const expected = [
      {
        range: {
          start: {
            line: 2,
            character: 0,
          },
          end: {
            line: 2,
            character: 4,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'asyncapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 0,
          },
          end: {
            line: 2,
            character: 4,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 10077,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'version' field",
              action: 'addChild',
              snippetYaml: 'version: \n  ',
              snippetJson: '"version": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    // TODO yaml errors not recovered? no result?

    /*    assert.deepEqual(result, [
      {
        code: 0,
        message: '(Error ,,,)',
        range: {
          end: {
            character: 6,
            line: 15,
          },
          start: {
            character: 5,
            line: 15,
          },
        },
        severity: 1,
      },
      {
        code: 0,
        message: '(Error ::)',
        range: {
          end: {
            character: 15,
            line: 16,
          },
          start: {
            character: 14,
            line: 16,
          },
        },
        severity: 1,
      },
    ]); */
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

    // console.log(JSON.stringify(result));
    const expected: SymbolInformation[] = [
      {
        name: 'spec-version',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 0,
              character: 0,
            },
            end: {
              line: 0,
              character: 8,
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
              line: 1,
              character: 0,
            },
            end: {
              line: 1,
              character: 4,
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
              line: 5,
              character: 2,
            },
            end: {
              line: 5,
              character: 9,
            },
          },
        },
      },
      {
        name: 'components',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 6,
              character: 0,
            },
            end: {
              line: 6,
              character: 10,
            },
          },
        },
      },
      {
        name: 'components-schemas',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 7,
              character: 2,
            },
            end: {
              line: 7,
              character: 9,
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
      'foo://bar/specHighlightNoQuotes.json',
      'json',
      0,
      specHighlightNoQuotes,
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
        0, 0, 8, 2, 0, 1, 0, 4, 4, 0, 1, 2, 7, 1, 0, 1, 0, 7, 25, 0, 1, 2, 4, 24, 0, 1, 4, 3, 11, 0,
        1, 0, 8, 28, 0, 1, 2, 3, 27, 0, 1, 4, 9, 5, 16, 1, 6, 7, 35, 64, 0, 9, 17, 32, 64, 1, 6, 7,
        35, 64, 1, 8, 7, 23, 0, 1, 10, 4, 35, 64, 0, 6, 6, 32, 64,
      ],
    });
  });

  it('test hover async', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlightNoQuotes.json',
      'json',
      0,
      specHighlightNoQuotes,
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
});
