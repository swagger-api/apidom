import { Attributes, Meta, ObjectElement } from 'minim';

class Amqp1MessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqp1MessageBinding';
  }
}

export default Amqp1MessageBinding;
