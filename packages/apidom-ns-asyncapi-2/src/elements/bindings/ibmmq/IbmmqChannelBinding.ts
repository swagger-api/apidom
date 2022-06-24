import {
  ObjectElement,
  StringElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class IbmmqChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqChannelBinding';
    this.classes.push('channel-binding');
  }

  get destinationType(): StringElement {
    return this.get('destinationType');
  }

  set destinationType(destinationType: StringElement) {
    this.set('destinationType', destinationType);
  }

  get queue(): ObjectElement {
    return this.get('queue');
  }

  set queue(queue: ObjectElement) {
    this.set('queue', queue);
  }

  get topic(): ObjectElement {
    return this.get('topic');
  }

  set topic(topic: ObjectElement) {
    this.set('topic', topic);
  }

  get maxMsgLength(): NumberElement {
    return this.get('maxMsgLength');
  }

  set maxMsgLength(maxMsgLength: NumberElement) {
    this.set('maxMsgLength', maxMsgLength);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default IbmmqChannelBinding;
