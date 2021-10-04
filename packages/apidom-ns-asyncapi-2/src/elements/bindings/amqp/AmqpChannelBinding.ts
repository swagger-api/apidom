import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement } from '@swagger-api/apidom-core';

class AmqpChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpChannelBinding';
  }

  get is(): StringElement {
    return this.get('is');
  }

  set is(is: StringElement) {
    this.set('is', is);
  }

  get exchange(): ObjectElement {
    return this.get('exchange');
  }

  set exchange(exchange: ObjectElement) {
    this.set('exchange', exchange);
  }

  get queue(): ObjectElement {
    return this.get('queue');
  }

  set queue(queue: ObjectElement) {
    this.set('queue', queue);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AmqpChannelBinding;
