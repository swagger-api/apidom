import { AsyncAPI3 } from '../target-specs.ts';

const documentation = [
  {
    docs: '#### [Messages Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messagesObject)\n\nDescribes a map of messages included in a channel.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n`{messageId}` | [Message Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageObject) \\| [Reference Object](https://www.asyncapi.com/docs/reference/specification/v3.0.0#referenceObject) | The key represents the messageId. The messageId value is case-sensitive. Tools and libraries MAY use the messageId to uniquely identify a message, therefore, it is RECOMMENDED to follow common programming naming conventions.',
    targetSpecs: AsyncAPI3,
  },
];

export default documentation;
