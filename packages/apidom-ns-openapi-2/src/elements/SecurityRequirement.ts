import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SecurityRequirement extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityRequirement';
  }
}

export default SecurityRequirement;
