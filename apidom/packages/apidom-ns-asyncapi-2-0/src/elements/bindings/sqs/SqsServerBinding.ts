import { Attributes, Meta, ObjectElement } from 'minim';

class SqsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sqsServerBinding';
  }
}

export default SqsServerBinding;
