import { Attributes, Meta, ObjectElement } from 'minim';

class KafkaServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaServerBinding';
  }
}

export default KafkaServerBinding;
