import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class OperationTags extends ArrayElement {
  static primaryClass = 'operation-tags';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(OperationTags.primaryClass);
  }
}

export default OperationTags;
