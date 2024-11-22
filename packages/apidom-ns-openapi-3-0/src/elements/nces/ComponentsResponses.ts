import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsResponses extends ObjectElement {
  static primaryClass = 'components-responses';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsResponses.primaryClass);
  }
}

export default ComponentsResponses;
