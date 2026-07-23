import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SecuritySchemes extends ObjectElement {
  static primaryClass = 'security-schemes';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SecuritySchemes.primaryClass);
  }
}

export default SecuritySchemes;
