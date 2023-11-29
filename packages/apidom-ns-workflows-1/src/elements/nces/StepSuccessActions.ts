import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepSuccessActions extends ArrayElement {
  static primaryClass = 'step-success-actions';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepSuccessActions.primaryClass);
  }
}

export default StepSuccessActions;
