import { Attributes, Meta, ObjectElement } from 'minim';

class MercureServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mercureServerBinding';
  }
}

export default MercureServerBinding;
