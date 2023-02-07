import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'type',
    insertText: 'type',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: '**REQUIRED**. Type of operation. Its value MUST be either request or response.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    label: 'method',
    insertText: 'method',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'When `type` is `request`, this is the HTTP method, otherwise it MUST be ignored. Its value MUST be one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, and `TRACE`.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    label: 'query',
    insertText: 'query',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nA Schema object containing the definitions for each query parameter. This schema MUST be of type `object` and have a `properties` key.',
    },
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'type',
    label: 'request',
    insertText: 'request',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'type',
    label: 'response',
    insertText: 'response',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'GET',
    insertText: 'GET',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'POST',
    insertText: 'POST',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'PUT',
    insertText: 'PUT',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'PATCH',
    insertText: 'PATCH',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'DELETE',
    insertText: 'DELETE',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'HEAD',
    insertText: 'HEAD',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'OPTIONS',
    insertText: 'OPTIONS',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'CONNECT',
    insertText: 'CONNECT',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    target: 'method',
    label: 'TRACE',
    insertText: 'TRACE',
    kind: 12,
    format: CompletionFormat.QUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
];

export default completion;
