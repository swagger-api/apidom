import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Operation Reply Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyObject)\n\nDescribes the reply part of an operation.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'address',
    docs: '[Operation Reply Address Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#operationReplyAddressObject) &#124; [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nDefinition of the address that implementations MUST use for the reply.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'channel',
    docs: '[Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)\n\\\n\\\nA $ref pointer to the definition of the channel in which this operation is performed. When address is specified, the address property of the referenced channel MUST be either null or not defined. If the operation reply is located inside a root Operation Object, it MUST point to a channel definition located in the [root Channels Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelsObject), and MUST NOT point to a channel definition located in the [Components Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#componentsObject) or anywhere else.',
    targetSpecs: AsyncAPI3,
  },
  {
    target: 'messages',
    docs: '[[Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject)]\n\\\n\\\nA list of $ref pointers pointing to the supported [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) that can be processed by this operation as reply. It MUST contain a subset of the messages defined in the [messages of the channel referenced in this operation reply](https://www.asyncapi.com/docs/reference/specification/v3.0.0#channelObjectMessages). Every message processed by this operation MUST be valid against one, and only one, of the message objects referenced in this list. Please note the messages property value MUST be a list of [Reference Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) and, as such, MUST NOT contain [Message Objects](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject). However, it is RECOMMENDED that parsers (or other software) dereference this property for a better development experience.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
