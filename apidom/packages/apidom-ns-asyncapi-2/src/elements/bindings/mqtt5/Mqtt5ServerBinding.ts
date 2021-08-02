import { Attributes, Meta, ObjectElement } from 'minim';

class Mqtt5ServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ServerBinding';
  }
}

export default Mqtt5ServerBinding;
