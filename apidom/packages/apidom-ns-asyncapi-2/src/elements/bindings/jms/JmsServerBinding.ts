import { Attributes, Meta, ObjectElement } from 'minim';

class JmsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsServerBinding';
  }
}

export default JmsServerBinding;
