import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ComponentsReplyAddresses extends ObjectElement {
  static primaryClass = 'components-reply-addresses';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsReplyAddresses.primaryClass);
  }
}

export default ComponentsReplyAddresses;
