import { Attributes, Meta } from 'minim';
import { StringElement } from '@swagger-api/apidom-core';

class AsyncApiVersion extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApiVersion';
    this.classes.push('spec-version');
    this.classes.push('version');
  }
}

export default AsyncApiVersion;
