import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class JmsMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsMessageBinding';
    this.classes.push('message-binding');
  }
}

export default JmsMessageBinding;
