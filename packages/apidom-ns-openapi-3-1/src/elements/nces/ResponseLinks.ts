import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ResponseLinks extends ObjectElement {
  static primaryClass = 'response-links';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ResponseLinks.primaryClass);
  }
}

export default ResponseLinks;
