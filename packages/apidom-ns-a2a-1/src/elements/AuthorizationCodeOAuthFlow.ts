import {
  BooleanElement,
  ObjectElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class AuthorizationCodeOAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'authorizationCodeOAuthFlow';
    this.classes.push('authorization-code-oauth-flow');
    this.classes.push('oauth-flow');
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

  get pkceRequired(): BooleanElement | undefined {
    return this.get('pkceRequired');
  }

  set pkceRequired(pkceRequired: BooleanElement | undefined) {
    this.set('pkceRequired', pkceRequired);
  }

  get scopes(): ObjectElement | undefined {
    return this.get('scopes');
  }

  set scopes(scopes: ObjectElement | undefined) {
    this.set('scopes', scopes);
  }
}

export default AuthorizationCodeOAuthFlow;
