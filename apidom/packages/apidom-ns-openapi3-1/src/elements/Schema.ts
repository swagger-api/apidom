import { Attributes, Meta, ObjectElement } from 'minim';

class Schema extends ObjectElement {
  constructor(content: Array<unknown>, meta: Meta, attributes: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
  }
}

export default Schema;
