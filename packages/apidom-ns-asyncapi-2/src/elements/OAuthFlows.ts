import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import OAuthFlowElement from './OAuthFlow';

class OAuthFlows extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oAuthFlows';
  }

  get implicit(): OAuthFlowElement | undefined {
    return this.get('implicit');
  }

  set implicit(implicit: OAuthFlowElement | undefined) {
    this.set('implicit', implicit);
  }

  get password(): OAuthFlowElement | undefined {
    return this.get('password');
  }

  set password(password: OAuthFlowElement | undefined) {
    this.set('password', password);
  }

  get clientCredentials(): OAuthFlowElement | undefined {
    return this.get('clientCredentials');
  }

  set clientCredentials(clientCredentials: OAuthFlowElement | undefined) {
    this.set('clientCredentials', clientCredentials);
  }

  get authorizationCode(): OAuthFlowElement | undefined {
    return this.get('authorizationCode');
  }

  set authorizationCode(authorizationCode: OAuthFlowElement | undefined) {
    this.set('authorizationCode', authorizationCode);
  }
}

export default OAuthFlows;
