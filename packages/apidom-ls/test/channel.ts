import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionList,
  Position,
  Diagnostic,
  DiagnosticSeverity,
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
import { logPerformance, logLevel } from './test-utils';

const specServersEmptyDash = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'channel', 'servers-empty-dash.yaml'))
  .toString();

const specBindingsEmpty = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'channel', 'bindings-empty.yaml'))
  .toString();

const specChannelLint = fs
  .readFileSync(path.join(__dirname, 'fixtures', 'async', 'channel', 'channel-lint.yaml'))
  .toString();

describe('asyncapi channel test', function () {
  const context: LanguageServiceContext = {
    metadata: metadata(),
    validatorProviders: [],
    performanceLogs: logPerformance,
    logLevel,
  };

  const languageService: LanguageService = getLanguageService(context);

  // eslint-disable-next-line mocha/no-hooks-for-single-case
  after(function () {
    languageService.terminate();
  });

  it('complete servers empty dash', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specServersEmptyDash.yaml',
      'yaml',
      0,
      specServersEmptyDash,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'dash space in channel/servers',
      11,
      8,
      {
        items: [
          {
            label: 'prod',
            insertText: 'prod$1',
            kind: 12,
            documentation: '',
            insertTextFormat: 2,
            filterText: '',
          },
          {
            label: 'dev',
            insertText: 'dev$1',
            kind: 12,
            documentation: '',
            insertTextFormat: 2,
            filterText: '',
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

  it('complete bindings empty', async function () {
    const completionContext: CompletionContext = {
      maxNumberOfItems: 100,
    };
    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specServersLast.yaml',
      'yaml',
      0,
      specBindingsEmpty,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const completionTestInputValue = [
      'empty line in channel/bindings',
      4,
      6,
      {
        items: [
          {
            target: 'bindings',
            label: 'http',
            insertText: 'http: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'ws',
            insertText: 'ws: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'kafka',
            insertText: 'kafka: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'amqp',
            insertText: 'amqp: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'amqp1',
            insertText: 'amqp1: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'mqtt',
            insertText: 'mqtt: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'mqtt5',
            insertText: 'mqtt5: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'nats',
            insertText: 'nats: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'jms',
            insertText: 'jms: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'sns',
            insertText: 'sns: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'sqs',
            insertText: 'sqs: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'stomp',
            insertText: 'stomp: \n  $1',
            kind: 14,
            insertTextFormat: 2,
          },
          {
            target: 'bindings',
            label: 'redis',
            insertText: 'redis: \n  $1',
            kind: 14,
            insertTextFormat: 2,
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

  it('lint channel', async function () {
    const validationContext: ValidationContext = {
      comments: DiagnosticSeverity.Error,
      maxNumberOfProblems: 100,
      relatedInformation: false,
    };

    // valid spec
    const doc: TextDocument = TextDocument.create(
      'foo://bar/specChannelLint.yaml',
      'yaml',
      0,
      specChannelLint,
    );

    const result = await languageService.doValidation(doc, validationContext);
    assert.deepEqual(result, [
      {
        range: { start: { line: 0, character: 0 }, end: { line: 0, character: 5 } },
        message: "should always have a 'info' section",
        severity: 1,
        code: 10069,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: "add 'info' section",
              action: 'addChild',
              snippetYaml: 'info: \n  \n',
              snippetJson: '"info": {\n  \n  },\n',
            },
          ],
        },
      },
      {
        range: { start: { line: 9, character: 2 }, end: { line: 9, character: 5 } },
        message:
          "If there are conflicts between the referenced definition and this Channel Item's definition, the behavior is undefined",
        severity: 2,
        code: 10134,
        source: 'apilint',
        data: {
          quickFix: [
            {
              message: 'remove $ref',
              action: 'removeChild',
              functionParams: ['$ref'],
              target: 'parent',
            },
          ],
        },
      },
      {
        range: { start: { line: 11, character: 4 }, end: { line: 11, character: 11 } },
        message: 'server names must be included in defined servers',
        severity: 1,
        code: 10129,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 14, character: 4 }, end: { line: 14, character: 11 } },
        message: 'server names must be included in defined servers',
        severity: 1,
        code: 10129,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 19, character: 17 }, end: { line: 19, character: 18 } },
        message: "description' value must be a string",
        severity: 1,
        code: 10127,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 22, character: 15 }, end: { line: 22, character: 18 } },
        message: '"subscribe" must be an operation',
        severity: 1,
        code: 10130,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 23, character: 13 }, end: { line: 23, character: 16 } },
        message: '"publish" must be an operation',
        severity: 1,
        code: 10131,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 30, character: 6 }, end: { line: 30, character: 12 } },
        message: 'parameter key must be defined in channel name',
        severity: 1,
        code: 10145,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 35, character: 17 }, end: { line: 35, character: 18 } },
        message: "description' value must be a string",
        severity: 1,
        code: 10127,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 38, character: 15 }, end: { line: 38, character: 18 } },
        message: '"subscribe" must be an operation',
        severity: 1,
        code: 10130,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 39, character: 13 }, end: { line: 39, character: 16 } },
        message: '"publish" must be an operation',
        severity: 1,
        code: 10131,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 44, character: 4 }, end: { line: 44, character: 14 } },
        message: 'parameters members must be parameter objects',
        severity: 1,
        code: 10132,
        source: 'apilint',
        data: {},
      },
      {
        range: { start: { line: 40, character: 4 }, end: { line: 40, character: 12 } },
        message: 'bindings members must be binding objects',
        severity: 1,
        code: 10133,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);
  });
});
