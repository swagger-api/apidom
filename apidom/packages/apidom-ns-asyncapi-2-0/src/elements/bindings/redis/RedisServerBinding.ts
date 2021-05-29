import { Attributes, Meta, ObjectElement } from 'minim';

class RedisServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'redisServerBinding';
  }
}

export default RedisServerBinding;
