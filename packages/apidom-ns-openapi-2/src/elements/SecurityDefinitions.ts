import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SecurityDefinitions extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityDefinitions';
  }
}

export default SecurityDefinitions;
