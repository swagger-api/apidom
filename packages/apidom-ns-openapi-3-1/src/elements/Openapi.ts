import { Attributes, Meta } from 'minim';
import { StringElement } from '@swagger-api/apidom-core';

class Openapi extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openapi';
    this.classes.push('spec-version');
    this.classes.push('version');
  }
}

export default Openapi;
