import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';
/**
 * @public
 */
class ComponentOperations extends ArrayElement {
  static primaryClass = 'components-operations';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ComponentOperations.primaryClass);
  }
}

export default ComponentOperations;
