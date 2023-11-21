import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SuccessActionCriteria extends ArrayElement {
  static primaryClass = 'success-action-criteria';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SuccessActionCriteria.primaryClass);
    this.classes.push('criteria');
  }
}

export default SuccessActionCriteria;
