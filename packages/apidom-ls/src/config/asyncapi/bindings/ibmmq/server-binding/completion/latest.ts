import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'groupId',
    insertText: 'groupId',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Defines a logical group of IBM MQ server objects. This is necessary to specify multi-endpoint configurations used in high availability deployments. If omitted, the server object is not part of a group.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'ccdtQueueManagerName',
    insertText: 'ccdtQueueManagerName',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The name of the IBM MQ queue manager to bind to in the CCDT file.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'cipherSpec',
    insertText: 'cipherSpec',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'The recommended cipher specification used to establish a TLS connection between the client and the IBM MQ queue manager. More information on SSL/TLS cipher specifications supported by IBM MQ can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.dev.doc/q113220_.html) in the IBM MQ Knowledge Center.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'multiEndpointServer',
    insertText: 'multiEndpointServer',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nIf `multiEndpointServer` is `true` then multiple connections can be workload balanced and applications should not make assumptions as to where messages are processed. Where message ordering, or affinity to specific message resources is necessary, a single endpoint (`multiEndpointServer` = `false`) may be required.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'heartBeatInterval',
    insertText: 'heartBeatInterval',
    kind: 14,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer`\n\\\n\\\nThe recommended value (in seconds) for the heartbeat sent to the queue manager during periods of inactivity. A value of zero means that no heart beats are sent. A value of `1` means that the client will use the value defined by the queue manager. More information on heart beat interval can be found on this [page](https://www.ibm.com/support/knowledgecenter/SSFKSJ_latest/com.ibm.mq.ref.dev.doc/q108450_.html) in the IBM MQ Knowledge Center.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'multiEndpointServer',
    label: 'false',
    insertText: 'false',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'multiEndpointServer',
    label: 'true',
    insertText: 'true',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    target: 'heartBeatInterval',
    label: '1',
    insertText: '1',
    kind: 12,
    format: CompletionFormat.UNQUOTED,
    type: CompletionType.VALUE,
    insertTextFormat: 2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
