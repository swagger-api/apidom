import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class MessageTraitExamples extends ArrayElement {
  static primaryClass = 'message-trait-examples';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MessageTraitExamples.primaryClass);
  }
}

export default MessageTraitExamples;
