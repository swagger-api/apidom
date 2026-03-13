import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SnsChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'snsChannelBinding';
    this.classes.push('channel-binding');
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get ordering(): ObjectElement | undefined {
    return this.get('ordering');
  }

  set ordering(ordering: ObjectElement | undefined) {
    this.set('ordering', ordering);
  }

  get policy(): ObjectElement | undefined {
    return this.get('policy');
  }

  set policy(policy: ObjectElement | undefined) {
    this.set('policy', policy);
  }

  get tags(): ObjectElement | undefined {
    return this.get('tags');
  }

  set tags(tags: ObjectElement | undefined) {
    this.set('tags', tags);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default SnsChannelBinding;
