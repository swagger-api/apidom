import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement } from '@swagger-api/apidom-core';

class OAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oAuthFlow';
  }

  get authorizationUrl(): StringElement {
    return this.get('authorizationUrl');
  }

  set authorizationUrl(authorizationUrl: StringElement) {
    this.set('authorizationUrl', authorizationUrl);
  }

  get tokenUrl(): StringElement {
    return this.get('tokenUrl');
  }

  set tokenUrl(tokenUrl: StringElement) {
    this.set('tokenUrl', tokenUrl);
  }

  get refreshUrl(): StringElement {
    return this.get('refreshUrl');
  }

  set refreshUrl(refreshUrl: StringElement) {
    this.set('refreshUrl', refreshUrl);
  }

  get scopes(): ObjectElement {
    return this.get('scopes');
  }

  set scopes(scopes: ObjectElement) {
    this.set('scopes', scopes);
  }
}

export default OAuthFlow;
