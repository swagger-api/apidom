import { Attributes, Meta, ObjectElement } from 'minim';

class HttpChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpChannelBinding';
  }
}

export default HttpChannelBinding;
