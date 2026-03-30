import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'groupId',
    insertText: 'groupId',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nId of the consumer group.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    label: 'groupId',
    insertText: 'groupId',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\nId of the consumer group.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    label: 'clientId',
    insertText: 'clientId',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject)\n\\\n\\\nId of the consumer inside a consumer group.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        targets: [{ path: 'bindingVersion' }],
        function: 'apilintValueOrArray',
        params: [['0.1.0']],
      },
    ],
  },
  {
    label: 'clientId',
    insertText: 'clientId',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject)\n\\\n\\\nId of the consumer inside a consumer group.',
    },
    targetSpecs: AsyncAPI3,
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
