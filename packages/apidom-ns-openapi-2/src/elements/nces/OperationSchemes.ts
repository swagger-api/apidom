import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class OperationSchemes extends ArrayElement {
  static primaryClass = 'operation-schemes';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationSchemes.primaryClass);
  }
}

export default OperationSchemes;
