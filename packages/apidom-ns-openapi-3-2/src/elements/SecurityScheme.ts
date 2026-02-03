import { StringElement, BooleanElement } from '@swagger-api/apidom-core';
import { SecuritySchemeElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class SecurityScheme extends SecuritySchemeElement {
  /**
   * OpenAPI 3.2: OAuth 2.0 metadata URL for discovering OAuth2 configuration.
   */
  get oauth2MetadataUrl(): StringElement | undefined {
    return this.get('oauth2MetadataUrl');
  }

  set oauth2MetadataUrl(oauth2MetadataUrl: StringElement | undefined) {
    this.set('oauth2MetadataUrl', oauth2MetadataUrl);
  }

  /**
   * OpenAPI 3.2: Marks this security scheme as deprecated.
   */
  get deprecated(): BooleanElement | undefined {
    return this.get('deprecated');
  }

  set deprecated(deprecated: BooleanElement | undefined) {
    this.set('deprecated', deprecated);
  }
}

export default SecurityScheme;
