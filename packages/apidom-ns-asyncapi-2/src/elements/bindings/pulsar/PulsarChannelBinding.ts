import {
  ObjectElement,
  ArrayElement,
  StringElement,
  NumberElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class PulsarChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pulsarChannelBinding';
    this.classes.push('channel-binding');
  }

  get namespace(): StringElement | undefined {
    return this.get('namespace');
  }

  set namespace(namespace: StringElement | undefined) {
    this.set('namespace', namespace);
  }

  get persistence(): StringElement | undefined {
    return this.get('persistence');
  }

  set persistence(persistence: StringElement | undefined) {
    this.set('persistence', persistence);
  }

  get compaction(): NumberElement | undefined {
    return this.get('compaction');
  }

  set compaction(compaction: NumberElement | undefined) {
    this.set('compaction', compaction);
  }

  get ['geo-replication'](): ArrayElement | undefined {
    return this.get('compaction');
  }

  set ['geo-replication'](geoReplication: ArrayElement | undefined) {
    this.set('geo-replication', geoReplication);
  }

  get retention(): ObjectElement | undefined {
    return this.get('retention');
  }

  set retention(retention: ObjectElement | undefined) {
    this.set('retention', retention);
  }

  get ttl(): NumberElement | undefined {
    return this.get('ttl');
  }

  set ttl(ttl: NumberElement | undefined) {
    this.set('ttl', ttl);
  }

  get deduplication(): BooleanElement | undefined {
    return this.get('deduplication');
  }

  set deduplication(deduplication: BooleanElement | undefined) {
    this.set('deduplication', deduplication);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default PulsarChannelBinding;
