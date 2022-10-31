import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class GooglePubSubServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'googlepubsubServerBinding';
    this.classes.push('server-binding');
  }
}

export default GooglePubSubServerBinding;
