import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import APIKeySecuritySchemeElement from './APIKeySecurityScheme.ts';
import HTTPAuthSecuritySchemeElement from './HTTPAuthSecurityScheme.ts';
import MutualTlsSecuritySchemeElement from './MutualTlsSecurityScheme.ts';
import OAuth2SecuritySchemeElement from './OAuth2SecurityScheme.ts';
import OpenIdConnectSecuritySchemeElement from './OpenIdConnectSecurityScheme.ts';

/**
 * @public
 *
 * Wrapper object for one of five concrete security scheme types. The A2A
 * schema models this as a protobuf `oneof` rather than a `type`-discriminated
 * union: exactly one of the five subobject fields is expected to be present.
 * No conditional visitor is needed — each field refracts to its specific
 * concrete element type.
 */
class SecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityScheme';
    this.classes.push('security-scheme');
  }

  get apiKeySecurityScheme(): APIKeySecuritySchemeElement | undefined {
    return this.get('apiKeySecurityScheme');
  }

  set apiKeySecurityScheme(apiKeySecurityScheme: APIKeySecuritySchemeElement | undefined) {
    this.set('apiKeySecurityScheme', apiKeySecurityScheme);
  }

  get httpAuthSecurityScheme(): HTTPAuthSecuritySchemeElement | undefined {
    return this.get('httpAuthSecurityScheme');
  }

  set httpAuthSecurityScheme(httpAuthSecurityScheme: HTTPAuthSecuritySchemeElement | undefined) {
    this.set('httpAuthSecurityScheme', httpAuthSecurityScheme);
  }

  get mtlsSecurityScheme(): MutualTlsSecuritySchemeElement | undefined {
    return this.get('mtlsSecurityScheme');
  }

  set mtlsSecurityScheme(mtlsSecurityScheme: MutualTlsSecuritySchemeElement | undefined) {
    this.set('mtlsSecurityScheme', mtlsSecurityScheme);
  }

  get oauth2SecurityScheme(): OAuth2SecuritySchemeElement | undefined {
    return this.get('oauth2SecurityScheme');
  }

  set oauth2SecurityScheme(oauth2SecurityScheme: OAuth2SecuritySchemeElement | undefined) {
    this.set('oauth2SecurityScheme', oauth2SecurityScheme);
  }

  get openIdConnectSecurityScheme(): OpenIdConnectSecuritySchemeElement | undefined {
    return this.get('openIdConnectSecurityScheme');
  }

  set openIdConnectSecurityScheme(
    openIdConnectSecurityScheme: OpenIdConnectSecuritySchemeElement | undefined,
  ) {
    this.set('openIdConnectSecurityScheme', openIdConnectSecurityScheme);
  }
}

export default SecurityScheme;
