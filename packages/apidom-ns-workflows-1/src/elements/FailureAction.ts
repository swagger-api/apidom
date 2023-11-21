import {
  ObjectElement,
  ArrayElement,
  StringElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class FailureAction extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'failureAction';
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get workflowId(): StringElement | undefined {
    return this.get('workflowId');
  }

  set workflowId(workflowId: StringElement | undefined) {
    this.set('workflowId', workflowId);
  }

  get stepId(): StringElement | undefined {
    return this.get('stepId');
  }

  set stepId(stepId: StringElement | undefined) {
    this.set('stepId', stepId);
  }

  get retryAfter(): NumberElement | undefined {
    return this.get('retryAfter');
  }

  set retryAfter(retryAfter: NumberElement | undefined) {
    this.set('retryAfter', retryAfter);
  }

  get retryLimit(): NumberElement | undefined {
    return this.get('retryLimit');
  }

  set retryLimit(retryLimit: NumberElement | undefined) {
    this.set('retryLimit', retryLimit);
  }

  get criteria(): ArrayElement | undefined {
    return this.get('criteria');
  }

  set criteria(criteria: ArrayElement | undefined) {
    this.set('criteria', criteria);
  }
}

export default FailureAction;
