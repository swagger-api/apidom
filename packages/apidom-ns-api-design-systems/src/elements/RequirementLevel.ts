import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class RequirementLevel extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requirementLevel';
  }
}

export default RequirementLevel;
