import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class PathItemParameters extends ArrayElement {
  static primaryClass = 'path-item-parameters';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(PathItemParameters.primaryClass);
    this.classes.push('parameters');
  }
}

export default PathItemParameters;
