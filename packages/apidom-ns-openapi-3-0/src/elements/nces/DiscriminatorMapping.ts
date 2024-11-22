import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class DiscriminatorMapping extends ObjectElement {
  static primaryClass = 'discriminator-mapping';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(DiscriminatorMapping.primaryClass);
  }
}

export default DiscriminatorMapping;
