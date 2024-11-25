import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsCorrelationIDs extends ObjectElement {
  static primaryClass = 'components-correlation-ids';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsCorrelationIDs.primaryClass);
  }
}

export default ComponentsCorrelationIDs;
