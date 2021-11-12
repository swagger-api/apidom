import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsSchemas extends ObjectElement {
  static primaryClass = 'components-schemas';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsSchemas.primaryClass);
  }
}

export default ComponentsSchemas;
