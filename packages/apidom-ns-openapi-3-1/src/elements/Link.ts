import {
  ObjectElement,
  StringElement,
  Element,
  isStringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';
import { ServerElement } from '@swagger-api/apidom-ns-openapi-3-0';

import OperationElement from './Operation';

class Link extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'link';
  }

  get operationRef(): StringElement {
    return this.get('operationRef');
  }

  set operationRef(operationRef: StringElement) {
    this.set('operationRef', operationRef);
  }

  get operationId(): StringElement {
    return this.get('operationId');
  }

  set operationId(operationId: StringElement) {
    this.set('operationId', operationId);
  }

  get operation(): OperationElement | undefined {
    if (isStringElement(this.operationRef)) {
      return this.operationRef.meta.get('operation');
    }
    if (isStringElement(this.operationId)) {
      return this.operationId.meta.get('operation');
    }
    return undefined;
  }

  set operation(operation: OperationElement | undefined) {
    this.set('operation', operation);
  }

  get parameters(): ObjectElement {
    return this.get('parameters');
  }

  set parameters(parameters: ObjectElement) {
    this.set('parameters', parameters);
  }

  get requestBody(): Element {
    return this.get('requestBody');
  }

  set requestBody(requestBody: Element) {
    this.set('requestBody', requestBody);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get server(): ServerElement {
    return this.get('server');
  }

  set server(server: ServerElement) {
    this.set('server', server);
  }
}

export default Link;
