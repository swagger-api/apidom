import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Mqtt5ChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ChannelBinding';
    this.classes.push('channel-binding');
  }
}

export default Mqtt5ChannelBinding;
