import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SqsChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'sqsChannelBinding';
    this.classes.push('channel-binding');
  }

  get queue(): ObjectElement | undefined {
    return this.get('queue');
  }

  set queue(queue: ObjectElement | undefined) {
    this.set('queue', queue);
  }

  get deadLetterQueue(): ObjectElement | undefined {
    return this.get('deadLetterQueue');
  }

  set deadLetterQueue(deadLetterQueue: ObjectElement | undefined) {
    this.set('deadLetterQueue', deadLetterQueue);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default SqsChannelBinding;
