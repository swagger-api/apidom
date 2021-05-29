import { Attributes, Meta, ObjectElement } from 'minim';

class RedisOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'redisOperationBinding';
  }
}

export default RedisOperationBinding;
