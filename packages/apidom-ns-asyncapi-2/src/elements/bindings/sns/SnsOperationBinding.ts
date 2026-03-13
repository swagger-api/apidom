import { ObjectElement, ArrayElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SnsOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'snsOperationBinding';
    this.classes.push('operation-binding');
  }

  get topic(): ObjectElement | undefined {
    return this.get('topic');
  }

  set topic(topic: ObjectElement | undefined) {
    this.set('topic', topic);
  }

  get consumers(): ArrayElement | undefined {
    return this.get('consumers');
  }

  set consumers(consumers: ArrayElement | undefined) {
    this.set('consumers', consumers);
  }

  get deliveryPolicy(): ObjectElement | undefined {
    return this.get('deliveryPolicy');
  }

  set deliveryPolicy(deliveryPolicy: ObjectElement | undefined) {
    this.set('deliveryPolicy', deliveryPolicy);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default SnsOperationBinding;
