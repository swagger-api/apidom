import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SecuritySchemeScopes extends ArrayElement {
  static primaryClass = 'security-scheme-scopes';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SecuritySchemeScopes.primaryClass);
  }
}

export default SecuritySchemeScopes;
