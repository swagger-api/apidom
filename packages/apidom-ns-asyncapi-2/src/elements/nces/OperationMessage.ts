import { Attributes, Meta } from 'minim';
import { ArrayElement } from '@swagger-api/apidom-core';

class OperationMessage extends ArrayElement {
  static primaryClass = 'operation-message';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationMessage.primaryClass);
  }
}

export default OperationMessage;
