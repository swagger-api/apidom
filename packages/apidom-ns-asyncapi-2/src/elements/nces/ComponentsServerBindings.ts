import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsServerBindings extends ObjectElement {
  static primaryClass = 'components-server-bindings';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsServerBindings.primaryClass);
  }
}

export default ComponentsServerBindings;
