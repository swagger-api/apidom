import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import AuthorizationCodeOAuthFlowElement from './AuthorizationCodeOAuthFlow.ts';
import ClientCredentialsOAuthFlowElement from './ClientCredentialsOAuthFlow.ts';
import DeviceCodeOAuthFlowElement from './DeviceCodeOAuthFlow.ts';

/**
 * @public
 *
 * Container for the three OAuth 2.0 flow configurations. Any subset may be
 * populated at once (this is not a discriminated union).
 */
class OAuthFlows extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oauthFlows';
    this.classes.push('oauth-flows');
  }

  get authorizationCode(): AuthorizationCodeOAuthFlowElement | undefined {
    return this.get('authorizationCode');
  }

  set authorizationCode(authorizationCode: AuthorizationCodeOAuthFlowElement | undefined) {
    this.set('authorizationCode', authorizationCode);
  }

  get clientCredentials(): ClientCredentialsOAuthFlowElement | undefined {
    return this.get('clientCredentials');
  }

  set clientCredentials(clientCredentials: ClientCredentialsOAuthFlowElement | undefined) {
    this.set('clientCredentials', clientCredentials);
  }

  get deviceCode(): DeviceCodeOAuthFlowElement | undefined {
    return this.get('deviceCode');
  }

  set deviceCode(deviceCode: DeviceCodeOAuthFlowElement | undefined) {
    this.set('deviceCode', deviceCode);
  }
}

export default OAuthFlows;
