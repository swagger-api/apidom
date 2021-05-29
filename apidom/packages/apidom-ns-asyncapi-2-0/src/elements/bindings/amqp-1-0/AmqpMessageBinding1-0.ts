import { Attributes, Meta, ObjectElement } from 'minim';

class AmqpMessageBinding1_0 extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpMessageBinding1_0';
  }
}

export default AmqpMessageBinding1_0;
