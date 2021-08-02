import { Attributes, Meta, ObjectElement } from 'minim';

class KafkaChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaChannelBinding';
  }
}

export default KafkaChannelBinding;
