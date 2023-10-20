import {
  ObjectElement,
  ArrayElement,
  BooleanElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import ExternalDocumentationElement from './ExternalDocumentation';
import ResponsesElement from './Responses';

class Operation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get tags(): ArrayElement | undefined {
    return this.get('tags');
  }

  set tags(tags: ArrayElement | undefined) {
    this.set('tags', tags);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(description: StringElement | undefined) {
    this.set('summary', description);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  set externalDocs(externalDocs: ExternalDocumentationElement | undefined) {
    this.set('externalDocs', externalDocs);
  }

  get externalDocs(): ExternalDocumentationElement | undefined {
    return this.get('externalDocs');
  }

  get operationId(): StringElement | undefined {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement | undefined) {
    this.set('operationId', operationId);
  }

  get parameters(): ArrayElement | undefined {
    return this.get('parameters');
  }

  set parameters(parameters: ArrayElement | undefined) {
    this.set('parameters', parameters);
  }

  get responses(): ResponsesElement | undefined {
    return this.get('responses');
  }

  set responses(responses: ResponsesElement | undefined) {
    this.set('responses', responses);
  }

  get schemes(): ArrayElement | undefined {
    return this.get('schemes');
  }

  set schemes(schemes: ArrayElement | undefined) {
    this.set('schemes', schemes);
  }

  get deprecated(): BooleanElement {
    if (this.hasKey('deprecated')) {
      return this.get('deprecated');
    }
    return new BooleanElement(false);
  }

  set deprecated(deprecated: BooleanElement) {
    this.set('deprecated', deprecated);
  }

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }
}

export default Operation;
