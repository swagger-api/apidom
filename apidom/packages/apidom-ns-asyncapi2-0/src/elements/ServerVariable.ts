import { Attributes, Meta, ObjectElement } from 'minim';

class ServerVariable extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverVariable';
  }
}

export default ServerVariable;
