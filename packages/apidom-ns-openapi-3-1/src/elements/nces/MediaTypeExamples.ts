import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class MediaTypeExamples extends ObjectElement {
  static primaryClass = 'media-type-examples';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(MediaTypeExamples.primaryClass);
    this.classes.push('examples');
  }
}

export default MediaTypeExamples;
