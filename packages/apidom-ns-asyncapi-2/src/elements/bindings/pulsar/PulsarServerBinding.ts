import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class PulsarServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pulsarServerBinding';
    this.classes.push('server-binding');
  }

  get tenant(): StringElement | undefined {
    return this.get('tenant');
  }

  set tenant(tenant: StringElement | undefined) {
    this.set('tenant', tenant);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default PulsarServerBinding;
