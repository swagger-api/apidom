import { Attributes, Meta, ObjectElement } from 'minim';

class Amqp1ServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqp1ServerBinding';
  }
}

export default Amqp1ServerBinding;
