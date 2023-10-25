import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class OperationParameters extends ArrayElement {
  static primaryClass = 'operation-parameters';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationParameters.primaryClass);
    this.classes.push('parameters');
  }
}

export default OperationParameters;
