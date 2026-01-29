import {
  ApidomCompletionItem,
  CompletionFormat,
  CompletionType,
} from '../../../apidom-language-types.ts';
import { AsyncAPI3 } from '../target-specs.ts';

const completion: ApidomCompletionItem[] = [
  {
    label: '$ref',
    insertText: '\\$ref',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A reference to a channel',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'address',
    insertText: 'address',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An optional string representation of this channel\'s address. The address is typically the "topic name", "routing key", "event type", or "path". When `null` or absent, it MUST be interpreted as unknown. This is useful when the address is generated dynamically at runtime or can\'t be known upfront. It MAY contain [Channel Address Expressions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelAddressExpressions). Query parameters and fragments SHALL NOT be used, instead use [bindings](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject) to define them.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'title',
    insertText: 'title',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A human-friendly title for the channel.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'summary',
    insertText: 'summary',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value: 'A short summary of the channel.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'messages',
    insertText: 'messages',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Messages Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messagesObject)\n\\\n\\\n**REQUIRED**. A map of the messages that will be sent to this channel by any application at any time. **Every message sent to this channel MUST be valid against one, and only one, of the [message objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) defined in this map.**',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'tags',
    insertText: 'tags',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Tags Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#tagsObject)\n\\\n\\\nA list of tags for logical grouping of channels.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'externalDocs',
    insertText: 'externalDocs',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[External Documentation Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#externalDocumentationObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nAdditional external documentation for this channel.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'description',
    insertText: 'description',
    kind: 14,
    format: CompletionFormat.QUOTED,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        'An optional description of this channel. [CommonMark syntax](https://spec.commonmark.org/) can be used for rich text representation.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'servers',
    insertText: 'servers',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nAn array of `$ref` pointers to the definition of the servers in which this channel is available. If the channel is located in the [root Channels Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelsObject), it MUST point to a subset of server definitions located in the [root Servers Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serversObject), and MUST NOT point to a subset of server definitions located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject) or anywhere else. If the channel is located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject), it MAY point to a [Server Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject) in any location. If `servers` is absent or empty, this channel MUST be available on all the servers defined in the [Servers Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serversObject). Please note the `servers` property value MUST be an array of [Reference Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) and, therefore, MUST NOT contain an array of [Server Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject). However, it is RECOMMENDED that parsers (or other software) dereference this property for a better development experience.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'parameters',
    insertText: 'parameters',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Parameters Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#parametersObject)\n\\\n\\\nA map of the parameters included in the channel address. It MUST be present only when the address contains [Channel Address Expressions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelAddressExpressions).',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'bindings',
    insertText: 'bindings',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Channel Bindings Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelBindingsObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA map where the keys describe the name of the protocol and the values describe protocol-specific definitions for the channel.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
