import { Attributes, Meta, ObjectElement } from 'minim';

class Response extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'response';
  }
}

export default Response;
