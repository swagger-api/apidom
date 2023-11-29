import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepDependencies extends ArrayElement {
  static primaryClass = 'step-dependencies';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepDependencies.primaryClass);
  }
}

export default StepDependencies;
