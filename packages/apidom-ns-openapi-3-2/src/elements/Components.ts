import { ObjectElement } from '@swagger-api/apidom-core';
import { ComponentsElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Components extends ComponentsElement {
  /**
   * OpenAPI 3.2: Reusable Media Type Objects.
   */
  get mediaTypes(): ObjectElement | undefined {
    return this.get('mediaTypes');
  }

  set mediaTypes(mediaTypes: ObjectElement | undefined) {
    this.set('mediaTypes', mediaTypes);
  }
}

export default Components;
