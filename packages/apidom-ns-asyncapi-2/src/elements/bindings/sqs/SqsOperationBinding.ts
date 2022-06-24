import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SqsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sqsOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default SqsOperationBinding;
