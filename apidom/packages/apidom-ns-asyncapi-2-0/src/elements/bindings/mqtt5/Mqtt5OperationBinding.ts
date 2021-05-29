import { Attributes, Meta, ObjectElement } from 'minim';

class Mqtt5OperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5OperationBinding';
  }
}

export default Mqtt5OperationBinding;
