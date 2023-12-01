import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepDependsOn extends ArrayElement {
  static primaryClass = 'step-depends-on';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepDependsOn.primaryClass);
  }
}

export default StepDependsOn;
