import {
  StringElement,
  NumberElement,
  ObjectElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class KafkaChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'kafkaChannelBinding';
    this.classes.push('channel-binding');
  }

  get topic(): StringElement | undefined {
    return this.get('topic');
  }

  set topic(topic: StringElement | undefined) {
    this.set('topic', topic);
  }

  get partitions(): NumberElement | undefined {
    return this.get('partitions');
  }

  set partitions(partitions: NumberElement | undefined) {
    this.set('partitions', partitions);
  }

  get replicas(): NumberElement | undefined {
    return this.get('replicas');
  }

  set replicas(replicas: NumberElement | undefined) {
    this.set('replicas', replicas);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default KafkaChannelBinding;
