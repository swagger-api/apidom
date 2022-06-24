import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class RedisServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'redisServerBinding';
    this.classes.push('server-binding');
  }
}

export default RedisServerBinding;
