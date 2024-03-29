import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class MercureMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mercureMessageBinding';
    this.classes.push('message-binding');
  }
}

export default MercureMessageBinding;
