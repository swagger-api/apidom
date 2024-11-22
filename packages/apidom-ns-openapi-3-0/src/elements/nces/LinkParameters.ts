import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class LinkParameters extends ObjectElement {
  static primaryClass = 'link-parameters';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(LinkParameters.primaryClass);
  }
}

export default LinkParameters;
