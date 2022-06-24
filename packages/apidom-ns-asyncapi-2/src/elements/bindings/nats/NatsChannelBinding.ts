import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class NatsChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsChannelBinding';
    this.classes.push('channel-binding');
  }
}

export default NatsChannelBinding;
