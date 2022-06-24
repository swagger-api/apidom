import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SqsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sqsServerBinding';
    this.classes.push('server-binding');
  }
}

export default SqsServerBinding;
