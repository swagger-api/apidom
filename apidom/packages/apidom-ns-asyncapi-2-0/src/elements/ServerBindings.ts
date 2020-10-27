import { Attributes, Meta, ObjectElement } from 'minim';

class ServerBindings extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'serverBindings';
  }
}

export default ServerBindings;
