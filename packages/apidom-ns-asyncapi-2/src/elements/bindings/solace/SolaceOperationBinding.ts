import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class SolaceOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'solaceOperationBinding';
    this.classes.push('operation-binding');
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }

  get destinations(): ArrayElement | undefined {
    return this.get('destinations');
  }

  set destinations(destinations: ArrayElement | undefined) {
    this.set('destinations', destinations);
  }
}

export default SolaceOperationBinding;
