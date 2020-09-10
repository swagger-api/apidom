import { Attributes, Meta, ObjectElement } from 'minim';

class Parameters extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameters';
  }
}

export default Parameters;
