import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class KafkaServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaServerBinding';
    this.classes.push('server-binding');
  }
}

export default KafkaServerBinding;
