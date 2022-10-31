import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class OAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oAuthFlow';
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

  get refreshUrl(): StringElement | undefined {
    return this.get('refreshUrl');
  }

  set refreshUrl(refreshUrl: StringElement | undefined) {
    this.set('refreshUrl', refreshUrl);
  }

  get scopes(): ObjectElement | undefined {
    return this.get('scopes');
  }

  set scopes(scopes: ObjectElement | undefined) {
    this.set('scopes', scopes);
  }
}

export default OAuthFlow;
