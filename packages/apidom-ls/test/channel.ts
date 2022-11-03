import fs from 'node:fs';
import path from 'node:path';
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
            label: '$ref',
            insertText: '\\$ref: $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value: 'A reference to an Channel Bindings',
            },
          },
          {
            label: 'http',
            insertText: 'http: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[HTTP Channel Binding](https://github.com/asyncapi/bindings/blob/master/http/#channel)\n\\\n\\\nProtocol-specific information for an HTTP channel.',
            },
          },
          {
            label: 'ws',
            insertText: 'ws: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[WebSockets Channel Binding](https://github.com/asyncapi/bindings/blob/master/websockets#channel)\n\\\n\\\nProtocol-specific information for a WebSockets channel.',
            },
          },
          {
            label: 'kafka',
            insertText: 'kafka: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Kafka Channel Binding](https://github.com/asyncapi/bindings/blob/master/kafka#channel)\n\\\n\\\nProtocol-specific information for a Kafka channel.',
            },
          },
          {
            label: 'amqp',
            insertText: 'amqp: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[AMQP Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp#channel)\n\\\n\\\nProtocol-specific information for an AMQP 0-9-1 channel.',
            },
          },
          {
            label: 'amqp1',
            insertText: 'amqp1: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[AMQP 1.0 Channel Binding](https://github.com/asyncapi/bindings/blob/master/amqp1#channel)\n\\\n\\\nProtocol-specific information for an AMQP 1.0 channel.',
            },
          },
          {
            label: 'mqtt',
            insertText: 'mqtt: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[MQTT Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt#channel)\n\\\n\\\nProtocol-specific information for an MQTT channel.',
            },
          },
          {
            label: 'mqtt5',
            insertText: 'mqtt5: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[MQTT 5 Channel Binding](https://github.com/asyncapi/bindings/blob/master/mqtt5#channel)\n\\\n\\\nProtocol-specific information for an MQTT 5 channel.',
            },
          },
          {
            label: 'nats',
            insertText: 'nats: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[NATS Channel Binding](https://github.com/asyncapi/bindings/blob/master/nats#channel)\n\\\n\\\nProtocol-specific information for a NATS channel.',
            },
          },
          {
            label: 'jms',
            insertText: 'jms: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[JMS Channel Binding](https://github.com/asyncapi/bindings/blob/master/jms#channel)\n\\\n\\\nProtocol-specific information for a JMS channel.',
            },
          },
          {
            label: 'sns',
            insertText: 'sns: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[SNS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sns#channel)\n\\\n\\\nProtocol-specific information for an SNS channel.',
            },
          },
          {
            label: 'sqs',
            insertText: 'sqs: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[SQS Channel Binding](https://github.com/asyncapi/bindings/blob/master/sqs#channel)\n\\\n\\\nProtocol-specific information for an SQS channel.',
            },
          },
          {
            label: 'stomp',
            insertText: 'stomp: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[STOMP Channel Binding](https://github.com/asyncapi/bindings/blob/master/stomp#channel)\n\\\n\\\nProtocol-specific information for a STOMP channel.',
            },
          },
          {
            label: 'redis',
            insertText: 'redis: \n  $1',
            kind: 14,
            insertTextFormat: 2,
            documentation: {
              kind: 'markdown',
              value:
                '[Redis Channel Binding](https://github.com/asyncapi/bindings/blob/master/redis#channel)\n\\\n\\\nProtocol-specific information for a Redis channel.',
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
        range: {
          start: { line: 0, character: 0 },
          end: { line: 0, character: 5 },
        },
        message: "should always have a 'info' section",
        severity: 1,
        code: 30501,
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
        range: {
          start: { line: 11, character: 4 },
          end: { line: 11, character: 11 },
        },
        message: 'server names must be included in defined servers',
        severity: 1,
        code: 120301,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 14, character: 4 },
          end: { line: 14, character: 11 },
        },
        message: 'server names must be included in defined servers',
        severity: 1,
        code: 120301,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 19, character: 17 },
          end: { line: 19, character: 18 },
        },
        message: "description' value must be a string",
        severity: 1,
        code: 120200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 22, character: 15 },
          end: { line: 22, character: 18 },
        },
        message: '"subscribe" must be an operation',
        severity: 1,
        code: 120400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 23, character: 13 },
          end: { line: 23, character: 16 },
        },
        message: '"publish" must be an operation',
        severity: 1,
        code: 120500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 25, character: 6 },
          end: { line: 25, character: 10 },
        },
        message:
          'This object MUST NOT contain any properties. Its name is reserved for future use.',
        severity: 1,
        code: 15000,
        source: 'apilint',
      },
      {
        range: {
          start: { line: 30, character: 6 },
          end: { line: 30, character: 12 },
        },
        message: 'parameter key must be defined in channel name',
        severity: 1,
        code: 160001,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 35, character: 17 },
          end: { line: 35, character: 18 },
        },
        message: "description' value must be a string",
        severity: 1,
        code: 120200,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 38, character: 15 },
          end: { line: 38, character: 18 },
        },
        message: '"subscribe" must be an operation',
        severity: 1,
        code: 120400,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 39, character: 13 },
          end: { line: 39, character: 16 },
        },
        message: '"publish" must be an operation',
        severity: 1,
        code: 120500,
        source: 'apilint',
        data: {},
      },
      {
        range: {
          start: { line: 41, character: 12 },
          end: { line: 41, character: 15 },
        },
        message: '"http" must be a HTTP Channel Binding',
        severity: 1,
        code: 180100,
        source: 'apilint',
        data: {},
      },
    ] as Diagnostic[]);
  });
});
