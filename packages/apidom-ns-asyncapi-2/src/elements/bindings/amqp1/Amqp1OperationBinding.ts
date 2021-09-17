import { Attributes, Meta, ObjectElement } from 'minim';

class Amqp1OperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqp1OperationBinding';
  }
}

export default Amqp1OperationBinding;
