import { Attributes, Meta, ObjectElement } from 'minim';

class SqsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sqsOperationBinding';
  }
}

export default SqsOperationBinding;
