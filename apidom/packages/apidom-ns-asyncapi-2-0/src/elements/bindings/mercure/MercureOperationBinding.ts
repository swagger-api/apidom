import { Attributes, Meta, ObjectElement } from 'minim';

class MercureOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mercureOperationBinding';
  }
}

export default MercureOperationBinding;
