import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class NatsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'natsOperationBinding';
    this.classes.push('operation-binding');
  }

  get queue(): StringElement | undefined {
    return this.get('queue');
  }

  set queue(queue: StringElement | undefined) {
    this.set('queue', queue);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default NatsOperationBinding;
