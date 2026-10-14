import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class DeviceCodeOAuthFlow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'deviceCodeOAuthFlow';
    this.classes.push('device-code-oauth-flow');
    this.classes.push('oauth-flow');
  }

  get deviceAuthorizationUrl(): StringElement | undefined {
    return this.get('deviceAuthorizationUrl');
  }

  set deviceAuthorizationUrl(deviceAuthorizationUrl: StringElement | undefined) {
    this.set('deviceAuthorizationUrl', deviceAuthorizationUrl);
  }

  get tokenUrl(): StringElement | undefined {
    return this.get('tokenUrl');
  }

  set tokenUrl(tokenUrl: StringElement | undefined) {
    this.set('tokenUrl', tokenUrl);
  }

  get refreshUrl(): StringElement | undefined {
    return this.get('refreshUrl');
  }

  set refreshUrl(refreshUrl: StringElement | undefined) {
    this.set('refreshUrl', refreshUrl);
  }

  get scopes(): ObjectElement | undefined {
    return this.get('scopes');
  }

  set scopes(scopes: ObjectElement | undefined) {
    this.set('scopes', scopes);
  }
}

export default DeviceCodeOAuthFlow;
