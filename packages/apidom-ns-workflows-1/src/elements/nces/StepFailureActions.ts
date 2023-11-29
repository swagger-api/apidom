import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepFailureActions extends ArrayElement {
  static primaryClass = 'step-failure-actions';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepFailureActions.primaryClass);
  }
}

export default StepFailureActions;
