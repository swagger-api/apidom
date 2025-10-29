import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';
import { UnsupportedOperationError } from '@swagger-api/apidom-error';
import { OAuthFlowElement } from '@swagger-api/apidom-ns-asyncapi-2';

class OAuthFlow extends OAuthFlowElement {
	constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
		super(content, meta, attributes);
	 	this.element = 'oauthFlow';
	}

	get scopes(): ObjectElement | undefined {
    throw new UnsupportedOperationError(
      'scopes keyword from Core vocabulary has been renamed to availableScopes.',
    );
  }

  set scopes(scopes: ObjectElement | undefined) {
    throw new UnsupportedOperationError(
      'scopes keyword from Core vocabulary has been renamed to availableScopes.',
    );
  }

  get availableScopes(): ObjectElement | undefined {
    return this.get('availableScopes');
  }

  set availableScopes(availableScopes: ObjectElement | undefined) {
    this.set('availableScopes', availableScopes);
  }
}

export default OAuthFlow;