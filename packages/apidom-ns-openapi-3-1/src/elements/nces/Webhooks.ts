import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class Webhooks extends ObjectElement {
  static primaryClass = 'webhooks';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(Webhooks.primaryClass);
  }
}

export default Webhooks;
