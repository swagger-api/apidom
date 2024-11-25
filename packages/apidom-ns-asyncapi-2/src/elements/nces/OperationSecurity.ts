import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class OperationSecurity extends ArrayElement {
  static primaryClass = 'operation-security';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationSecurity.primaryClass);
  }
}

export default OperationSecurity;
