import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Webhooks extends ObjectElement {
  static primaryClass = 'webhooks';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Webhooks.primaryClass);
  }
}

export default Webhooks;
