import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class Step extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'step';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get stepId(): StringElement | undefined {
    return this.get('stepId');
  }

  set stepId(stepId: StringElement | undefined) {
    this.set('stepId', stepId);
  }

  get operationId(): StringElement | undefined {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement | undefined) {
    this.set('operationId', operationId);
  }

  get operationRef(): StringElement | undefined {
    return this.get('operationRef');
  }

  set operationRef(operationRef: StringElement | undefined) {
    this.set('operationRef', operationRef);
  }

  get workflowId(): StringElement | undefined {
    return this.get('workflowId');
  }

  set workflowId(workflowId: StringElement | undefined) {
    this.set('workflowId', workflowId);
  }

  get parameters(): ArrayElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ArrayElement | undefined) {
    this.set('parameters', parameters);
  }

  get dependsOn(): ArrayElement | undefined {
    return this.get('dependsOn');
  }

  set dependsOn(dependsOn: ArrayElement | undefined) {
    this.set('dependsOn', dependsOn);
  }

  get successCriteria(): ArrayElement | undefined {
    return this.get('successCriteria');
  }

  set successCriteria(successCriteria: ArrayElement | undefined) {
    this.set('successCriteria', successCriteria);
  }

  get onSuccess(): ArrayElement | undefined {
    return this.get('onSuccess');
  }

  set onSuccess(onSuccess: ArrayElement | undefined) {
    this.set('onSuccess', onSuccess);
  }

  get onFailure(): ArrayElement | undefined {
    return this.get('onFailure');
  }

  set onFailure(onFailure: ArrayElement | undefined) {
    this.set('onFailure', onFailure);
  }

  get outputs(): ObjectElement | undefined {
    return this.get('outputs');
  }

  set outputs(outputs: ObjectElement | undefined) {
    this.set('outputs', outputs);
  }
}

export default Step;
