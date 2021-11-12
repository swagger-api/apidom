import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class EncodingHeaders extends ObjectElement {
  static primaryClass = 'encoding-headers';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(EncodingHeaders.primaryClass);
  }
}

export default EncodingHeaders;
