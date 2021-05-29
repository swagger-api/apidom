import { Attributes, Meta, ObjectElement } from 'minim';

class MercureChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mercureChannelBinding';
  }
}

export default MercureChannelBinding;
