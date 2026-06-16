import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import OAuthFlowsElement from './OAuthFlows.ts';

/**
 * @public
 */
class OAuth2SecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'oauth2SecurityScheme';
    this.classes.push('oauth2-security-scheme');
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get flows(): OAuthFlowsElement | undefined {
    return this.get('flows');
  }

  set flows(flows: OAuthFlowsElement | undefined) {
    this.set('flows', flows);
  }

  get oauth2MetadataUrl(): StringElement | undefined {
    return this.get('oauth2MetadataUrl');
  }

  set oauth2MetadataUrl(oauth2MetadataUrl: StringElement | undefined) {
    this.set('oauth2MetadataUrl', oauth2MetadataUrl);
  }
}

export default OAuth2SecurityScheme;
