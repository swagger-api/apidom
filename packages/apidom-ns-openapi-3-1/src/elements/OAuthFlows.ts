import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

import OAuthFlowElement from './OAuthFlow';

class OAuthFlows extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oAuthFlows';
  }

  get implicit(): OAuthFlowElement {
    return this.get('implicit');
  }

  set implicit(implicit: OAuthFlowElement) {
    this.set('implicit', implicit);
  }

  get password(): OAuthFlowElement {
    return this.get('password');
  }

  set password(password: OAuthFlowElement) {
    this.set('password', password);
  }

  get clientCredentials(): OAuthFlowElement {
    return this.get('clientCredentials');
  }

  set clientCredentials(clientCredentials: OAuthFlowElement) {
    this.set('clientCredentials', clientCredentials);
  }

  get authorizationCode(): OAuthFlowElement {
    return this.get('authorizationCode');
  }

  set authorizationCode(authorizationCode: OAuthFlowElement) {
    this.set('authorizationCode', authorizationCode);
  }
}

export default OAuthFlows;
