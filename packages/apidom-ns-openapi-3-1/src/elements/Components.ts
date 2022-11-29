import { ObjectElement } from '@swagger-api/apidom-core';
import { ComponentsElement } from '@swagger-api/apidom-ns-openapi-3-0';

class Components extends ComponentsElement {
  get pathItems(): ObjectElement | undefined {
    return this.get('pathItems');
  }

  set pathItems(pathItems: ObjectElement | undefined) {
    this.set('pathItems', pathItems);
  }
}

export default Components;
