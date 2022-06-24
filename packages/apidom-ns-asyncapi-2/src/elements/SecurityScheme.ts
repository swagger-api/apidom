import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import OAuthFlowsElement from './OAuthFlows';

class SecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityScheme';
  }

  get type(): StringElement {
    return this.get('type');
  }

  set type(type: StringElement) {
    this.set('type', type);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get in(): StringElement {
    return this.get('in');
  }

  set in(inVal: StringElement) {
    this.set('in', inVal);
  }

  get scheme(): StringElement {
    return this.get('scheme');
  }

  set scheme(scheme: StringElement) {
    this.set('scheme', scheme);
  }

  get bearerFormat(): StringElement {
    return this.get('bearerFormat');
  }

  set bearerFormat(bearerFormat: StringElement) {
    this.set('bearerFormat', bearerFormat);
  }

  get flows(): OAuthFlowsElement | undefined {
    return this.get('flows');
  }

  set flows(flows: OAuthFlowsElement | undefined) {
    this.set('flows', flows);
  }

  get openIdConnectUrl(): StringElement {
    return this.get('openIdConnectUrl');
  }

  set openIdConnectUrl(openIdConnectUrl: StringElement) {
    this.set('openIdConnectUrl', openIdConnectUrl);
  }
}

export default SecurityScheme;
