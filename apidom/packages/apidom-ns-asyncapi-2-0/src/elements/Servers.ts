import { Attributes, Meta, ObjectElement } from 'minim';

class Servers extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'servers';
  }
}

export default Servers;
