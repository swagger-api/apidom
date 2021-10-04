import { Attributes, Meta } from 'minim';
import { StringElement } from '@swagger-api/apidom-core';

class Openapi extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openapi';
  }
}

export default Openapi;
