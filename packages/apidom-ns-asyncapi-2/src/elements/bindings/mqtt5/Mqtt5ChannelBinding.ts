import { Attributes, Meta, ObjectElement } from 'minim';

class Mqtt5ChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ChannelBinding';
  }
}

export default Mqtt5ChannelBinding;
