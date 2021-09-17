import { Attributes, Meta, ObjectElement } from 'minim';

class NatsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsOperationBinding';
  }
}

export default NatsOperationBinding;
