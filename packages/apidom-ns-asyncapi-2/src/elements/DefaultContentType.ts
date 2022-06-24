import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class DefaultContentType extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'defaultContentType';
  }
}

export default DefaultContentType;
