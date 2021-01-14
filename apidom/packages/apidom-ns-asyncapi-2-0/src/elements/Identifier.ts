import { Attributes, Meta, StringElement } from 'minim';

class Identifier extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'identifier';
  }
}

export default Identifier;
