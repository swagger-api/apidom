import { Attributes, Meta } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class ComponentsCorrelationIDs extends ObjectElement {
  static primaryClass = 'components-correlation-ids';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsCorrelationIDs.primaryClass);
  }
}

export default ComponentsCorrelationIDs;
