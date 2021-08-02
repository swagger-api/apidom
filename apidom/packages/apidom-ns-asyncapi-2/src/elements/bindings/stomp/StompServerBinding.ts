import { Attributes, Meta, ObjectElement } from 'minim';

class StompServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'stompServerBinding';
  }
}

export default StompServerBinding;
