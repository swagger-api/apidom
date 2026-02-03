import { StringElement } from '@swagger-api/apidom-core';
import { OAuthFlowElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class OAuthFlow extends OAuthFlowElement {
  /**
   * OpenAPI 3.2: URL for OAuth 2.0 device authorization endpoint.
   * Used for device authorization grant flow.
   */
  get deviceAuthorizationUrl(): StringElement | undefined {
    return this.get('deviceAuthorizationUrl');
  }

  set deviceAuthorizationUrl(deviceAuthorizationUrl: StringElement | undefined) {
    this.set('deviceAuthorizationUrl', deviceAuthorizationUrl);
  }
}

export default OAuthFlow;
