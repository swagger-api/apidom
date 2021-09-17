import { Attributes, Meta, ObjectElement } from 'minim';

class Mqtt5MessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5MessageBinding';
  }
}

export default Mqtt5MessageBinding;
