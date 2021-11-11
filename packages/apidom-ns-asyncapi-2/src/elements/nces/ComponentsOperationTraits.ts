import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsOperationTraits extends ObjectElement {
  static primaryClass = 'components-operation-traits';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsOperationTraits.primaryClass);
  }
}

export default ComponentsOperationTraits;
