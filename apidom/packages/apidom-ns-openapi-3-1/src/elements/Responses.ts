import { Attributes, Meta, ObjectElement } from 'minim';

class Responses extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'responses';
  }
}

export default Responses;
