import { Attributes, Meta, ObjectElement } from 'minim';

class Server extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'server';
  }
}

export default Server;
