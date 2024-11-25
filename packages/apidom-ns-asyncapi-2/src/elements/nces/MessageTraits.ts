import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class MessageTraits extends ArrayElement {
  static primaryClass = 'message-traits';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MessageTraits.primaryClass);
  }
}

export default MessageTraits;
