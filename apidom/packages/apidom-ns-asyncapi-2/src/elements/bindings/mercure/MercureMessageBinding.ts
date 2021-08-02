import { Attributes, Meta, ObjectElement } from 'minim';

class MercureMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mercureMessageBinding';
  }
}

export default MercureMessageBinding;
