import { Attributes, Meta, StringElement } from 'minim';

class Openapi extends StringElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openapi';
  }
}

export default Openapi;
