import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../../../../apidom-language-types.ts';
import { AsyncAPI2, AsyncAPI3 } from '../../../../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: 'destinations',
    insertText: 'destinations',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'List of [Destination Objects](https://github.com/asyncapi/bindings/tree/master/solace#destination-object).',
    },
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'timeToLive',
    insertText: 'timeToLive',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer` | [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nInterval in milliseconds or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the lifetime of the message.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'timeToLive',
    insertText: 'timeToLive',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nInterval in milliseconds or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the lifetime of the message.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'priority',
    insertText: 'priority',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer` | [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) | [Reference Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#referenceObject)\n\\\n\\\nThe valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://v2.asyncapi.com/docs/reference/specification/v2.6.0#schemaObject) containing the definition of the priority.',
    },
    targetSpecs: AsyncAPI2,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'priority',
    insertText: 'priority',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`integer` | [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) | [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nThe valid priority value range is 0-255 with 0 as the lowest priority and 255 as the highest, or a [Schema Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#schemaObject) containing the definition of the priority.',
    },
    targetSpecs: AsyncAPI3,
    conditions: [
      {
        function: 'missingField',
        params: ['bindingVersion'],
      },
    ],
  },
  {
    label: 'dmqEligible',
    insertText: 'dmqEligible',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '`boolean`\n\\\n\\\nSet the message to be eligible to be moved to a Dead Message Queue. The default value is false.',
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
