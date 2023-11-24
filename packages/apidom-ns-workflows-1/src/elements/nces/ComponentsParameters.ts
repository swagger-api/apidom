import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ComponentsParameters extends ObjectElement {
  static primaryClass = 'components-parameters';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsParameters.primaryClass);
  }
}

export default ComponentsParameters;
