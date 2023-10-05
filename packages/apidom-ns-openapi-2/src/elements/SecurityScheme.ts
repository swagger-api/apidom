import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class SecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityScheme';
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get in(): StringElement | undefined {
    return this.get('in');
  }

  set in(inVal: StringElement | undefined) {
    this.set('in', inVal);
  }

  get flow(): StringElement | undefined {
    return this.get('flow');
  }

  set flow(flow: StringElement | undefined) {
    this.set('flow', flow);
  }

  get authorizationUrl(): StringElement | undefined {
    return this.get('authorizationUrl');
  }

  set authorizationUrl(authorizationUrl: StringElement | undefined) {
    this.set('authorizationUrl', authorizationUrl);
  }

  get tokenUrl(): StringElement | undefined {
    return this.get('tokenUrl');
  }

  set tokenUrl(tokenUrl: StringElement | undefined) {
    this.set('tokenUrl', tokenUrl);
  }

  get scopes(): ArrayElement | undefined {
    return this.get('scopes');
  }

  set scopes(scopes: ArrayElement | undefined) {
    this.set('scopes', scopes);
  }
}

export default SecurityScheme;
