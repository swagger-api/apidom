import { ObjectElement } from '@swagger-api/apidom-core';
import { PathItemElement } from '@swagger-api/apidom-ns-openapi-3-0';

import OperationElement from './Operation.ts';

/**
 * @public
 */
class PathItem extends PathItemElement {
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

  get QUERY(): OperationElement {
    return this.get('query');
  }

  set QUERY(operation: OperationElement | undefined) {
    this.set('query', operation);
  }

  get additionalOperations(): ObjectElement | undefined {
    return this.get('additionalOperations');
  }

  set additionalOperations(operations: ObjectElement | undefined) {
    this.set('additionalOperations', operations);
  }
}

export default PathItem;
