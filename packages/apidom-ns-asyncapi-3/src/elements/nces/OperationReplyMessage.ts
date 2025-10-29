import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class OperationReplyMessage extends ArrayElement {
  static primaryClass = 'operation-reply-message';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationReplyMessage.primaryClass);
  }
}

export default OperationReplyMessage;
