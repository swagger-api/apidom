import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class MessageTraits extends ArrayElement {
  static primaryClass = 'message-traits';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MessageTraits.primaryClass);
  }
}

export default MessageTraits;
