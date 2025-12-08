import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class OperationReplyMessages extends ArrayElement {
  static primaryClass = 'operation-reply-messages';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationReplyMessages.primaryClass);
  }
}

export default OperationReplyMessages;
