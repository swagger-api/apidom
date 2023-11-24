import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ComponentsInputs extends ObjectElement {
  static primaryClass = 'components-inputs';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsInputs.primaryClass);
  }
}

export default ComponentsInputs;
