import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 *
 * Deprecated by A2A spec; use Authorization Code + PKCE instead.
 */
class ImplicitOAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'implicitOAuthFlow';
    this.classes.push('implicit-oauth-flow');
    this.classes.push('oauth-flow');
  }

  get authorizationUrl(): StringElement | undefined {
    return this.get('authorizationUrl');
  }

  set authorizationUrl(authorizationUrl: StringElement | undefined) {
    this.set('authorizationUrl', authorizationUrl);
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

export default ImplicitOAuthFlow;
