import { Attributes, Meta, ObjectElement } from 'minim';

class RedisMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'redisMessageBinding';
  }
}

export default RedisMessageBinding;
