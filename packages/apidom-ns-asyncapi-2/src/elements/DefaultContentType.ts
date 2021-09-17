import { Attributes, Meta, StringElement } from 'minim';

class DefaultContentType extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'defaultContentType';
  }
}

export default DefaultContentType;
