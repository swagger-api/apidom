import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepOnFailure extends ArrayElement {
  static primaryClass = 'step-on-failure';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepOnFailure.primaryClass);
  }
}

export default StepOnFailure;
