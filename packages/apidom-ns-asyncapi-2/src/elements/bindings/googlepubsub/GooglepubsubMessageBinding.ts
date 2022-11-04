import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class GooglepubsubMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'googlepubsubMessageBinding';
    this.classes.push('message-binding');
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }

  get attributesProp(): ObjectElement | undefined {
    return this.get('attributes');
  }

  set attributesProp(attributes: ObjectElement | undefined) {
    this.set('attributes', attributes);
  }

  get orderingKey(): StringElement | undefined {
    return this.get('orderingKey');
  }

  set orderingKey(orderingKey: StringElement | undefined) {
    this.set('orderingKey', orderingKey);
  }

  get schema(): ObjectElement | undefined {
    return this.get('schema');
  }

  set schema(schema: ObjectElement | undefined) {
    this.set('schema', schema);
  }
}

export default GooglepubsubMessageBinding;
