import { Attributes, Meta, ObjectElement } from 'minim';

class Amqp1ChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqp1ChannelBinding';
  }
}

export default Amqp1ChannelBinding;
