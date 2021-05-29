import { Attributes, Meta, ObjectElement } from 'minim';

class JmsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsOperationBinding';
  }
}

export default JmsOperationBinding;
