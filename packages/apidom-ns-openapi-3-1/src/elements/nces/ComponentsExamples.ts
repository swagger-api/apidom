import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ComponentsExamples extends ObjectElement {
  static primaryClass = 'components-examples';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsExamples.primaryClass);
    this.classes.push('examples');
  }
}

export default ComponentsExamples;
