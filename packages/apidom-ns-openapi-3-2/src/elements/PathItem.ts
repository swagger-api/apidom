import { ObjectElement } from '@swagger-api/apidom-core';
import { PathItemElement } from '@swagger-api/apidom-ns-openapi-3-1';

import OperationElement from './Operation.ts';

/**
 * @public
 */
class PathItem extends PathItemElement {
  /**
   * OpenAPI 3.2: QUERY operation support.
   * Allows query operations with request bodies.
   */
  get QUERY(): OperationElement {
    return this.get('query');
  }

  set QUERY(operation: OperationElement | undefined) {
    this.set('query', operation);
  }

  /**
   * OpenAPI 3.2: Additional operations beyond standard HTTP methods.
   */
  get additionalOperations(): ObjectElement | undefined {
    return this.get('additionalOperations');
  }

  set additionalOperations(operations: ObjectElement | undefined) {
    this.set('additionalOperations', operations);
  }
}

export default PathItem;
