import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsResponses extends ObjectElement {
  static primaryClass = 'components-responses';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsResponses.primaryClass);
  }
}

export default ComponentsResponses;
