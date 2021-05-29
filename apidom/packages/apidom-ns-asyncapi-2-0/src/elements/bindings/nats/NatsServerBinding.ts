import { Attributes, Meta, ObjectElement } from 'minim';

class NatsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsServerBinding';
  }
}

export default NatsServerBinding;
