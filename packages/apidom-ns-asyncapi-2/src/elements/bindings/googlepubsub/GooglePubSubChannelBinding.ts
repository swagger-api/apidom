import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class GooglePubSubChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'googlepubsubChannelBinding';
    this.classes.push('channel-binding');
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }

  get labels(): ObjectElement | undefined {
    return this.get('labels');
  }

  set labels(labels: ObjectElement | undefined) {
    this.set('labels', labels);
  }

  get messageRetentionDuration(): StringElement | undefined {
    return this.get('messageRetentionDuration');
  }

  set messageRetentionDuration(messageRetentionDuration: StringElement | undefined) {
    this.set('messageRetentionDuration', messageRetentionDuration);
  }

  get messageStoragePolicy(): ObjectElement | undefined {
    return this.get('messageStoragePolicy');
  }

  set messageStoragePolicy(messageStoragePolicy: ObjectElement | undefined) {
    this.set('messageStoragePolicy', messageStoragePolicy);
  }

  get schemaSettings(): ObjectElement | undefined {
    return this.get('schemaSettings');
  }

  set schemaSettings(schemaSettings: ObjectElement | undefined) {
    this.set('schemaSettings', schemaSettings);
  }

  get topic(): StringElement | undefined {
    return this.get('topic');
  }

  set topic(topic: StringElement | undefined) {
    this.set('topic', topic);
  }
}

export default GooglePubSubChannelBinding;
