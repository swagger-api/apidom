import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class FailureActionCriteria extends ArrayElement {
  static primaryClass = 'failure-action-criteria';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(FailureActionCriteria.primaryClass);
    this.classes.push('criteria');
  }
}

export default FailureActionCriteria;
