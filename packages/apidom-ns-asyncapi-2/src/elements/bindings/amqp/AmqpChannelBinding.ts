import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class AmqpChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'amqpChannelBinding';
    this.classes.push('channel-binding');
  }

  get is(): StringElement | undefined {
    return this.get('is');
  }

  set is(is: StringElement | undefined) {
    this.set('is', is);
  }

  get exchange(): ObjectElement | undefined {
    return this.get('exchange');
  }

  set exchange(exchange: ObjectElement | undefined) {
    this.set('exchange', exchange);
  }

  get queue(): ObjectElement | undefined {
    return this.get('queue');
  }

  set queue(queue: ObjectElement | undefined) {
    this.set('queue', queue);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AmqpChannelBinding;
