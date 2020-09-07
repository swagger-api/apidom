import { Attributes, Meta, ObjectElement } from 'minim';

class Callback extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'callback';
  }
}

export default Callback;
