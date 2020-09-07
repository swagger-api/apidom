import { Attributes, Meta, ObjectElement } from 'minim';

class RequestBody extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requestBody';
  }
}

export default RequestBody;
