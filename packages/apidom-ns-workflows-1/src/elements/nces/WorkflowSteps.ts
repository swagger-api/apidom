import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class WorkflowSteps extends ArrayElement {
  static primaryClass = 'workflow-steps';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(WorkflowSteps.primaryClass);
  }
}

export default WorkflowSteps;
