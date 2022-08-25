import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ComponentsRequestBodies extends ObjectElement {
  static primaryClass = 'components-request-bodies';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsRequestBodies.primaryClass);
  }
}

export default ComponentsRequestBodies;
