import { Attributes, Meta, ObjectElement } from 'minim';

class SecurityRequirement extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityRequirement';
  }
}

export default SecurityRequirement;
