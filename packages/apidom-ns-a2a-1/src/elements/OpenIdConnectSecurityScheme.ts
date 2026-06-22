import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class OpenIdConnectSecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openIdConnectSecurityScheme';
    this.classes.push('open-id-connect-security-scheme');
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get openIdConnectUrl(): StringElement | undefined {
    return this.get('openIdConnectUrl');
  }

  set openIdConnectUrl(openIdConnectUrl: StringElement | undefined) {
    this.set('openIdConnectUrl', openIdConnectUrl);
  }
}

export default OpenIdConnectSecurityScheme;
