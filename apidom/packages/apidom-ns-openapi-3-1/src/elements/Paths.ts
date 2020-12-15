import { Attributes, Meta, ObjectElement } from 'minim';

class Paths extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'paths';
  }
}

export default Paths;
