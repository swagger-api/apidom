import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class HttpChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpChannelBinding';
    this.classes.push('channel-binding');
  }
}

export default HttpChannelBinding;
