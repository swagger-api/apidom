import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class StepOutputs extends ObjectElement {
  static primaryClass = 'step-outputs';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(StepOutputs.primaryClass);
  }
}

export default StepOutputs;
