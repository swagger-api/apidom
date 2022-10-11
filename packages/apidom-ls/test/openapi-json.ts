import fs from 'node:fs';
import path from 'node:path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DefinitionParams, ReferenceParams } from 'vscode-languageserver-protocol';
import {
  // CompletionList,
  Diagnostic,
  DiagnosticSeverity,
  Position,
  Location,
  SymbolInformation,
} from 'vscode-languageserver-types';
import { Element, traverse } from '@swagger-api/apidom-core';

import getLanguageService from '../src/apidom-language-service';
import {
  CompletionContext,
  LanguageService,
  LanguageServiceContext,
  ValidationContext,
  Format,
} from '../src/apidom-language-types';
import { metadata } from './metadata';
import { parse } from '../src/parser-factory';
import { getSourceMap, SourceMap } from '../src/utils/utils';
import { OpenAPi31JsonSchemaValidationProvider } from '../src/services/validation/providers/openapi-31-json-schema-validation-provider';
import { logPerformance, logLevel } from './test-utils';
import testTokens from './test-tokens';

const spec = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample-api.json')).toString();
/* const specAjvSimple = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'ajv-simple-api.json'))
  .toString(); */
const specCompletion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-completion.json'))
  .toString();
const specError = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'sample-api-error.json'))
  .toString();
const specHighlight = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api.json'))
  .toString();

const specLinterUpper = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-upper.json'))
  .toString();

const specLinterNoVersion = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'syntax/sample-api-no-version.json'))
  .toString();

const derefBaseURI = path.join(__dirname, 'fixtures', 'deref/rootwithserver.json').toString();

const specDeref = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/rootwithserver.json'))
  .toString();
const specDereferenced = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/dereferenced.json'))
  .toString();

const specFull = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/fullroot.json'))
  .toString();

const specFullResponses = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'deref/fullrootresponses.json'))
  .toString();

const completionTestInput = [
  [
    'empty line in openapi 3.1 object value',
    3,
    2,
    {
      items: [],
      isIncomplete: false,
    },
  ],
  [
    'openapi key start',
    2,
    2,
    {
      items: [],
      isIncomplete: false,
    },
  ],
  [
    'info key start',
    4,
    2,
    {
      items: [],
      isIncomplete: false,
    },
  ],
];

const defTestInput = [
  [
    'ref value',
    42,
    33,
    {
      range: {
        end: {
          character: 7,
          line: 54,
        },
        start: {
          character: 13,
          line: 52,
        },
      },
      uri: 'foo://bar/specFull.json',
    },
  ],
];

const refTestInput = [
  [
    'def value',
    42,
    33,
    [
      {
        range: {
          end: {
            character: 7,
            line: 54,
          },
          start: {
            character: 13,
            line: 52,
          },
        },
        uri: 'foo://bar/specFullRefs.json',
      },
    ],
  ],
];

describe('apidom-ls', function () {
  const metadataOas = JSON.parse(JSON.stringify(metadata()));
  const oasJsonSchemavalidationProvider = new OpenAPi31JsonSchemaValidationProvider();
  const context: LanguageServiceContext = {
    metadata: metadataOas,
    validatorProviders: [oasJsonSchemavalidationProvider],
    performanceLogs: logPerformance,
    logLevel,
  };

  context.metadata!.tokens = testTokens;

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
            line: 11,
            character: 4,
          },
          end: {
            line: 11,
            character: 13,
          },
        },
        message: 'must match exactly one schema in oneOf',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 3,
            character: 2,
          },
          end: {
            line: 3,
            character: 8,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 77,
            character: 13,
          },
          end: {
            line: 77,
            character: 51,
          },
        },
        message: 'must match format "uri-reference"',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 185,
            character: 6,
          },
          end: {
            line: 185,
            character: 18,
          },
        },
        message: 'must be array',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 104,
            character: 8,
          },
          end: {
            line: 104,
            character: 20,
          },
        },
        message: 'must be array',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 113,
            character: 8,
          },
          end: {
            line: 113,
            character: 19,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 27,
            character: 6,
          },
          end: {
            line: 27,
            character: 15,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 27,
            character: 6,
          },
          end: {
            line: 27,
            character: 15,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 35,
            character: 6,
          },
          end: {
            line: 35,
            character: 12,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 35,
            character: 6,
          },
          end: {
            line: 35,
            character: 12,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 51,
            character: 6,
          },
          end: {
            line: 51,
            character: 19,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 51,
            character: 6,
          },
          end: {
            line: 51,
            character: 19,
          },
        },
        message: 'must NOT have unevaluated properties',
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 8,
            line: 3,
          },
          start: {
            character: 2,
            line: 3,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5121300,
        data: {},
        message: 'parameters must be an array',
        range: {
          end: {
            character: 7,
            line: 190,
          },
          start: {
            character: 20,
            line: 185,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5121301,
        data: {},
        message: 'parameters must be an array of Parameter Objects',
        range: {
          end: {
            character: 12,
            line: 92,
          },
          start: {
            character: 4,
            line: 92,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5130600,
        data: {},
        message: 'parameters must be an array',
        range: {
          end: {
            character: 9,
            line: 109,
          },
          start: {
            character: 22,
            line: 104,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5130601,
        data: {},
        message: 'parameters must be an array of Parameter Objects',
        range: {
          end: {
            character: 11,
            line: 95,
          },
          start: {
            character: 6,
            line: 95,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5140001,
        data: {},
        message: 'Responses Object values must be of Response Object shape',
        range: {
          end: {
            character: 19,
            line: 113,
          },
          start: {
            character: 8,
            line: 113,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 19,
            line: 113,
          },
          start: {
            character: 8,
            line: 113,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
    doc = TextDocument.create('foo://bar/specError.json', 'json', 0, specError);
    result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, [
      {
        range: { start: { line: 16, character: 5 }, end: { line: 16, character: 6 } },
        message: '(Error ,)',
        severity: 1,
        code: 0,
        source: 'syntax',
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 8,
            line: 3,
          },
          start: {
            character: 2,
            line: 3,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5121300,
        data: {},
        message: 'parameters must be an array',
        range: {
          end: {
            character: 7,
            line: 190,
          },
          start: {
            character: 20,
            line: 185,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5121301,
        data: {},
        message: 'parameters must be an array of Parameter Objects',
        range: {
          end: {
            character: 12,
            line: 92,
          },
          start: {
            character: 4,
            line: 92,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5130600,
        data: {},
        message: 'parameters must be an array',
        range: {
          end: {
            character: 9,
            line: 109,
          },
          start: {
            character: 22,
            line: 104,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5130601,
        data: {},
        message: 'parameters must be an array of Parameter Objects',
        range: {
          end: {
            character: 11,
            line: 95,
          },
          start: {
            character: 6,
            line: 95,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 5140001,
        data: {},
        message: 'Responses Object values must be of Response Object shape',
        range: {
          end: {
            character: 19,
            line: 113,
          },
          start: {
            character: 8,
            line: 113,
          },
        },
        severity: 1,
        source: 'apilint',
      },
      {
        code: 15000,
        message: 'Object includes not allowed fields',
        range: {
          end: {
            character: 19,
            line: 113,
          },
          start: {
            character: 8,
            line: 113,
          },
        },
        severity: 1,
        source: 'apilint',
      },
    ]);
  });

  it('test validation and linter', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specLinterUpper.json',
      'json',
      0,
      specLinterUpper,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "must have required property 'title'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'title'",
        severity: 1,
        code: 5020101,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'title' field",
              action: 'addChild',
              snippetYaml: 'title: \n  ',
              snippetJson: '"title": "",\n    ',
            },
          ],
        },
      },
    ];
    assert.deepEqual(result, expected as Diagnostic[]);
  });

  it('test linter no version', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specLinterNoVersion.json',
      'json',
      0,
      specLinterNoVersion,
    );

    const result = await languageService.doValidation(doc, validationContext);

    const expected = [
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "must have required property 'version'",
        severity: 1,
        code: 0,
        source: 'openapi schema',
      },
      {
        range: {
          start: {
            line: 2,
            character: 2,
          },
          end: {
            line: 2,
            character: 8,
          },
        },
        message: "should always have a 'version'",
        severity: 1,
        code: 5020601,
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
      // assert.deepEqual(result, input[3] as CompletionList);
      assert(result?.items && result?.items.length > 0);
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

    const expected: SymbolInformation[] = [
      {
        name: 'spec-version',
        kind: 7,
        location: {
          uri: '',
          range: {
            start: {
              line: 2,
              character: 2,
            },
            end: {
              line: 2,
              character: 11,
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
              line: 4,
              character: 2,
            },
            end: {
              line: 4,
              character: 8,
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
              line: 8,
              character: 4,
            },
            end: {
              line: 8,
              character: 13,
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

  it('test semantic highlighting', async function () {
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specHighlight.json',
      'json',
      0,
      specHighlight,
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
        1, 2, 9, 16, 0, 0, 0, 9, 2, 0, 1, 2, 6, 4, 0, 1, 4, 9, 1, 0, 2, 2, 9, 25, 0, 1, 5, 5, 11, 0,
        2, 2, 7, 18, 0, 1, 4, 4, 6, 0, 1, 6, 5, 5, 16, 1, 8, 13, 35, 64, 0, 15, 6, 32, 64, 2, 6, 6,
        5, 32, 1, 8, 13, 35, 64, 0, 15, 7, 32, 64, 3, 4, 4, 6, 0, 1, 6, 6, 5, 32, 1, 8, 13, 35, 64,
        0, 15, 7, 32, 64, 3, 4, 4, 6, 0, 1, 6, 5, 5, 16, 1, 8, 13, 35, 64, 0, 15, 6, 32, 64,
      ],
    });
  });

  it('test deref', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specDeref.json', 'json', 0, specDeref);

    const result = await languageService.doDeref(doc, {
      format: Format.JSON,
      baseURI: derefBaseURI,
    });

    // calling with no baseURI, in this case deref service will try to use the first defined server URL as baseURI
    // const result = await languageService.doDeref(doc);
    assert.equal(result, specDereferenced.substr(0, specDereferenced.length - 1));
  });

  it('test definition', async function () {
    const doc: TextDocument = TextDocument.create('foo://bar/specFull.json', 'json', 0, specFull);

    for (const input of defTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing def for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const definitionParams: DefinitionParams = {
        position: pos,
        textDocument: doc,
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideDefinition(doc, definitionParams);
      assert.deepEqual(result, input[3] as Location);
    }
  });

  it('test references', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specFullRefs.json',
      'json',
      0,
      specFull,
    );

    for (const input of refTestInput) {
      // eslint-disable-next-line no-console
      console.log(`testing refs for ${input[0]}`);
      const pos = Position.create(input[1] as number, input[2] as number);
      // eslint-disable-next-line no-await-in-loop
      const referenceParams: ReferenceParams = {
        position: pos,
        textDocument: doc,
        context: { includeDeclaration: false },
      };
      // eslint-disable-next-line no-await-in-loop
      const result = await languageService.doProvideReferences(doc, referenceParams);
      assert.deepEqual(result, input[3] as Location[]);
    }
  });

  // eslint-disable-next-line consistent-return
  it('test parse json', async function () {
    const doc: TextDocument = TextDocument.create(
      'foo://bar/file.json',
      'json',
      0,
      specFullResponses,
    );

    const text: string = doc.getText();
    const diagnostics: Diagnostic[] = [];

    // eslint-disable-next-line consistent-return
    const result = await parse(text, undefined);

    const { api } = result;
    if (!api) {
      return diagnostics;
    }
    api.freeze(); // !! freeze and add parent !!

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function printSourceMap(node: Element): void {
      const sm: SourceMap = getSourceMap(node);
      // eslint-disable-next-line no-console
      console.log(node.element, `${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}`);
    }

    function printContent(node: Element): void {
      const sm: SourceMap = getSourceMap(node);
      // eslint-disable-next-line no-console
      console.log(
        node.element,
        node.getMetaProperty('classes', []).toValue(),
        node.getMetaProperty('http-method', []).toValue(),
        `[${sm.offset} / ${sm.line}:${sm.column} - ${sm.endLine}:${sm.endColumn}]`,
        node.toValue(),
      );
    }

    // traverse(printSourceMap, api);
    traverse(printContent, api);

    if (result.annotations) {
      for (const annotation of result.annotations) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(annotation));
      }
    }
  });
});
