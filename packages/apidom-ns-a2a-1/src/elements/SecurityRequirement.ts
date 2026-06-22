import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 *
 * The `schemes` map's keys are security scheme names; its values are
 * StringList elements containing required scopes.
 */
class SecurityRequirement extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'securityRequirement';
    this.classes.push('security-requirement');
  }

  get schemes(): ObjectElement | undefined {
    return this.get('schemes');
  }

  set schemes(schemes: ObjectElement | undefined) {
    this.set('schemes', schemes);
  }
}

export default SecurityRequirement;
