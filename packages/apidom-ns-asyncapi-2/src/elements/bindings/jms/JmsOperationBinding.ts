import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class JmsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default JmsOperationBinding;
