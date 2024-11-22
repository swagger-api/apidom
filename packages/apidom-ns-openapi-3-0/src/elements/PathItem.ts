import {
  StringElement,
  ObjectElement,
  ArrayElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import OperationElement from './Operation.ts';

/**
 * @public
 */
class PathItem extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'pathItem';
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get GET(): OperationElement {
    return this.get('get');
  }

  set GET(operation: OperationElement | undefined) {
    this.set('GET', operation);
  }

  get PUT(): OperationElement {
    return this.get('put');
  }

  set PUT(operation: OperationElement | undefined) {
    this.set('PUT', operation);
  }

  get POST(): OperationElement {
    return this.get('post');
  }

  set POST(operation: OperationElement | undefined) {
    this.set('POST', operation);
  }

  get DELETE(): OperationElement {
    return this.get('delete');
  }

  set DELETE(operation: OperationElement | undefined) {
    this.set('DELETE', operation);
  }

  get OPTIONS(): OperationElement {
    return this.get('options');
  }

  set OPTIONS(operation: OperationElement | undefined) {
    this.set('OPTIONS', operation);
  }

  get HEAD(): OperationElement {
    return this.get('head');
  }

  set HEAD(operation: OperationElement | undefined) {
    this.set('HEAD', operation);
  }

  get PATCH(): OperationElement {
    return this.get('patch');
  }

  set PATCH(operation: OperationElement | undefined) {
    this.set('PATCH', operation);
  }

  get TRACE(): OperationElement {
    return this.get('trace');
  }

  set TRACE(operation: OperationElement | undefined) {
    this.set('TRACE', operation);
  }

  get servers(): ArrayElement | undefined {
    return this.get('servers');
  }

  set servers(servers: ArrayElement | undefined) {
    this.set('servers', servers);
  }

  get parameters(): ArrayElement {
    return this.get('parameters');
  }

  set parameters(parameters: ArrayElement | undefined) {
    this.set('parameters', parameters);
  }
}

export default PathItem;
