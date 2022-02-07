import { Attributes, Meta, StringElement } from 'minim';
import { ObjectElement, ArrayElement } from '@swagger-api/apidom-core';

class SolaceOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'solaceOperationBinding';
    this.classes.push('operation-binding');
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }

  get destinations(): ArrayElement {
    return this.get('destinations');
  }

  set destinations(destinations: ArrayElement) {
    this.set('destinations', destinations);
  }
}

export default SolaceOperationBinding;
