import { Attributes, Meta, ObjectElement } from 'minim';

class Reference extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
  }
}

export default Reference;
