import { Attributes, Meta, ObjectElement } from 'minim';

class JmsChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsChannelBinding';
  }
}

export default JmsChannelBinding;
