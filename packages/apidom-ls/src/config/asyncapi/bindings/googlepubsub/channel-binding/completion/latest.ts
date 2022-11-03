import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types';

const completion: ApidomCompletionItem[] = [
  {
    label: 'labels',
    insertText: 'labels',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Object`\n\\\n\\\nAn object of key-value pairs _(These are used to categorize Cloud Resources like Cloud Pub/Sub Topics.)_',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'messageRetentionDuration',
    insertText: 'messageRetentionDuration',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'Indicates the minimum duration to retain a message after it is published to the topic _(Must be a valid [Duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).)_',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'messageStoragePolicy',
    insertText: 'messageStoragePolicy',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Message Storage Policy Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub#message-storage-policy-object)\n\\\n\\\nPolicy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'schemaSettings',
    insertText: 'schemaSettings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Settings Object](https://github.com/asyncapi/bindings/blob/master/googlepubsub#schema-settings-object)\n\\\n\\\nSettings for validating messages published against a schema.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'topic',
    insertText: 'topic',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'The Google Cloud Pub/Sub Topic name.',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
];

export default completion;
