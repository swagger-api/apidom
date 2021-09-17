import { Attributes, Meta, ObjectElement } from 'minim';

class NatsMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsMessageBinding';
  }
}

export default NatsMessageBinding;
