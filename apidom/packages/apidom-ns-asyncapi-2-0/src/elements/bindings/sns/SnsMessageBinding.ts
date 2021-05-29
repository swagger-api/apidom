import { Attributes, Meta, ObjectElement } from 'minim';

class SnsMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'snsMessageBinding';
  }
}

export default SnsMessageBinding;
