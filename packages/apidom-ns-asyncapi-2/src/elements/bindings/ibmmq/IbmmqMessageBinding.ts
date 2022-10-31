import {
  ObjectElement,
  StringElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class IbmmqMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ibmmqMessageBinding';
    this.classes.push('message-binding');
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get headers(): StringElement | undefined {
    return this.get('headers');
  }

  set headers(headers: StringElement | undefined) {
    this.set('headers', headers);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get expiry(): NumberElement | undefined {
    return this.get('expiry');
  }

  set expiry(expiry: NumberElement | undefined) {
    this.set('expiry', expiry);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default IbmmqMessageBinding;
