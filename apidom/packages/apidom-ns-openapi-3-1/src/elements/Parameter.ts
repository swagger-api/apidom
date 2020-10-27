import { Attributes, Meta, ObjectElement } from 'minim';

class Parameter extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }
}

export default Parameter;
