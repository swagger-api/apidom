import { ObjectElement } from '@swagger-api/apidom-core';
import { ComponentsElement } from '@swagger-api/apidom-ns-openapi-3-0';

/**
 * @public
 */
class Components extends ComponentsElement {
  get pathItems(): ObjectElement | undefined {
    return this.get('pathItems');
  }

  set pathItems(pathItems: ObjectElement | undefined) {
    this.set('pathItems', pathItems);
  }

  get mediaTypes(): ObjectElement | undefined {
    return this.get('mediaTypes');
  }

  set mediaTypes(mediaTypes: ObjectElement | undefined) {
    this.set('mediaTypes', mediaTypes);
  }
}

export default Components;
