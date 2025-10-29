import { Attributes, Meta } from '@swagger-api/apidom-core';
import { SecuritySchemeElement } from '@swagger-api/apidom-ns-asyncapi-2';
import type { ArrayElement } from '@swagger-api/apidom-core';

class SecurityScheme extends SecuritySchemeElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityScheme';
  }

  get scopes(): ArrayElement | undefined {
    return this.get('scopes');
  }

  set scopes(scopes: ArrayElement | undefined) {
    this.set('scopes', scopes);
  }
   
}

export default SecurityScheme;
