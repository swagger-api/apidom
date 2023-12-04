import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class Workflow extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'workflow';
  }

  get workflowId(): StringElement | undefined {
    return this.get('workflowId');
  }

  set workflowId(workflowId: StringElement | undefined) {
    this.set('workflowId', workflowId);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get inputs(): ObjectElement | undefined {
    return this.get('inputs');
  }

  set inputs(inputs: ObjectElement | undefined) {
    this.set('inputs', inputs);
  }

  get steps(): ArrayElement | undefined {
    return this.get('steps');
  }

  set steps(steps: ArrayElement | undefined) {
    this.set('steps', steps);
  }

  get outputs(): ObjectElement | undefined {
    return this.get('outputs');
  }

  set outputs(outputs: ObjectElement | undefined) {
    this.set('outputs', outputs);
  }
}

export default Workflow;
