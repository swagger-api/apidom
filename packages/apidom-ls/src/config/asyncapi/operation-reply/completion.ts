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
      value: 'A reference to an Operation Reply Object',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'address',
    insertText: 'address',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nDefinition of the address that implementations MUST use for the reply.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'channel',
    insertText: 'channel',
    kind: 14,
    format: CompletionFormat.OBJECT,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA $ref pointer to the definition of the channel in which this operation is performed. When address is specified, the address property of the channel referenced by this property MUST be either null or not defined. If the operation reply is located inside a root Operation Object, it MUST point to a channel definition located in the [root Channels Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelsObject), and MUST NOT point to a channel definition located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject) or anywhere else. If the operation reply is located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject), it MAY point to a [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject) in any location. Please note the channel property value MUST be a [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) and, therefore, MUST NOT contain a [Channel Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObject). However, it is RECOMMENDED that parsers (or other software) dereference this property for a better development experience.',
    },
    targetSpecs: AsyncAPI3,
  },
  {
    label: 'messages',
    insertText: 'messages',
    kind: 14,
    format: CompletionFormat.ARRAY,
    type: CompletionType.PROPERTY,
    insertTextFormat: 2,
    documentation: {
      kind: 'markdown',
      value:
        '[[Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nA list of $ref pointers pointing to the supported [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) that can be processed by this operation as reply. It MUST contain a subset of the messages defined in the [messages of the channel referenced in this operation reply](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObjectMessages), and MUST NOT point to a subset of message definitions located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject) or anywhere else. Every message processed by this operation MUST be valid against one, and only one, of the message objects referenced in this list. Please note the messages property value MUST be a list of [Reference Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) and, as such, MUST NOT contain [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject). However, it is RECOMMENDED that parsers (or other software) dereference this property for a better development experience.',
    },
    targetSpecs: AsyncAPI3,
  },
];

export default completion;
