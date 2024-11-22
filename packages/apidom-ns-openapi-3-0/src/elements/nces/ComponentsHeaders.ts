import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsHeaders extends ObjectElement {
  static primaryClass = 'components-headers';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsHeaders.primaryClass);
  }
}

export default ComponentsHeaders;
