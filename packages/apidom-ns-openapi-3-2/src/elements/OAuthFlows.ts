import { OAuthFlowsElement } from '@swagger-api/apidom-ns-openapi-3-1';

import OAuthFlowElement from './OAuthFlow.ts';

/**
 * @public
 */
class OAuthFlows extends OAuthFlowsElement {
  /**
   * OpenAPI 3.2: Configuration for OAuth 2.0 device authorization flow.
   */
  get deviceAuthorization(): OAuthFlowElement | undefined {
    return this.get('deviceAuthorization');
  }

  set deviceAuthorization(deviceAuthorization: OAuthFlowElement | undefined) {
    this.set('deviceAuthorization', deviceAuthorization);
  }
}

export default OAuthFlows;
