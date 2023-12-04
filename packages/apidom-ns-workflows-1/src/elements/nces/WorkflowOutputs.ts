import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class WorkflowOutputs extends ObjectElement {
  static primaryClass = 'workflow-outputs';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(WorkflowOutputs.primaryClass);
  }
}

export default WorkflowOutputs;
