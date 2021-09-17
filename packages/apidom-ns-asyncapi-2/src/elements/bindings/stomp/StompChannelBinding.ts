import { Attributes, Meta, ObjectElement } from 'minim';

class StompChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'stompChannelBinding';
  }
}

export default StompChannelBinding;
