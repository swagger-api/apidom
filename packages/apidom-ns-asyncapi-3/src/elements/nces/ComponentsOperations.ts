import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ComponentsOperations extends ObjectElement {
  static primaryClass = 'components-operations';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentsOperations.primaryClass);
  }
}

export default ComponentsOperations;
