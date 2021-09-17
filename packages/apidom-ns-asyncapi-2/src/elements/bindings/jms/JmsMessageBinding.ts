import { Attributes, Meta, ObjectElement } from 'minim';

class JmsMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsMessageBinding';
  }
}

export default JmsMessageBinding;
