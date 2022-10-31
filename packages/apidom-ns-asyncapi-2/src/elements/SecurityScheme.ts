import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import OAuthFlowsElement from './OAuthFlows';

class SecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityScheme';
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get in(): StringElement | undefined {
    return this.get('in');
  }

  set in(inVal: StringElement | undefined) {
    this.set('in', inVal);
  }

  get scheme(): StringElement | undefined {
    return this.get('scheme');
  }

  set scheme(scheme: StringElement | undefined) {
    this.set('scheme', scheme);
  }

  get bearerFormat(): StringElement | undefined {
    return this.get('bearerFormat');
  }

  set bearerFormat(bearerFormat: StringElement | undefined) {
    this.set('bearerFormat', bearerFormat);
  }

  get flows(): OAuthFlowsElement | undefined {
    return this.get('flows');
  }

  set flows(flows: OAuthFlowsElement | undefined) {
    this.set('flows', flows);
  }

  get openIdConnectUrl(): StringElement | undefined {
    return this.get('openIdConnectUrl');
  }

  set openIdConnectUrl(openIdConnectUrl: StringElement | undefined) {
    this.set('openIdConnectUrl', openIdConnectUrl);
  }
}

export default SecurityScheme;
