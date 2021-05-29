import { Attributes, Meta, ObjectElement } from 'minim';

class NatsChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsChannelBinding';
  }
}

export default NatsChannelBinding;
