import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class MessageExamples extends ArrayElement {
  static primaryClass = 'message-examples';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MessageExamples.primaryClass);
  }
}

export default MessageExamples;
