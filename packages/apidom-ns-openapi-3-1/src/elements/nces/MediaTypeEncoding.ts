import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class MediaTypeEncoding extends ObjectElement {
  static primaryClass = 'media-type-encoding';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MediaTypeEncoding.primaryClass);
  }
}

export default MediaTypeEncoding;
