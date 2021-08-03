import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement, NumberElement } from 'apidom';

class IbmmqMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqMessageBinding';
  }

  get type(): StringElement {
    return this.get('type');
  }

  set type(type: StringElement) {
    this.set('type', type);
  }

  get headers(): StringElement {
    return this.get('headers');
  }

  set headers(headers: StringElement) {
    this.set('headers', headers);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get expiry(): NumberElement {
    return this.get('expiry');
  }

  set expiry(expiry: NumberElement) {
    this.set('expiry', expiry);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default IbmmqMessageBinding;
