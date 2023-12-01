import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepParameters extends ArrayElement {
  static primaryClass = 'step-parameters';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepParameters.primaryClass);
    this.classes.push('parameters');
  }
}

export default StepParameters;
