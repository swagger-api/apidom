import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { SecuritySchemeElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class SecurityScheme extends SecuritySchemeElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
  }

  /**
   * OpenAPI 3.2: OAuth 2.0 metadata URL for discovering OAuth2 configuration.
   */
  get oauth2MetadataUrl(): StringElement | undefined {
    return this.get('oauth2MetadataUrl');
  }

  set oauth2MetadataUrl(oauth2MetadataUrl: StringElement | undefined) {
    this.set('oauth2MetadataUrl', oauth2MetadataUrl);
  }
}

export default SecurityScheme;
