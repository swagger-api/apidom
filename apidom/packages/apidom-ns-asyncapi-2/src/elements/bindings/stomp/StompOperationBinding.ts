import { Attributes, Meta, ObjectElement } from 'minim';

class StompOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'stompOperationBinding';
  }
}

export default StompOperationBinding;
