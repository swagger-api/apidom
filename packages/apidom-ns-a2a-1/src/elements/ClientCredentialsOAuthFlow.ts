import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ClientCredentialsOAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'clientCredentialsOAuthFlow';
    this.classes.push('client-credentials-oauth-flow');
    this.classes.push('oauth-flow');
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

export default ClientCredentialsOAuthFlow;
