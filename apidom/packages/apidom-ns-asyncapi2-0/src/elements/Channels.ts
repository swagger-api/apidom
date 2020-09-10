import { Attributes, Meta, ObjectElement } from 'minim';

class Channels extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channels';
  }
}

export default Channels;
