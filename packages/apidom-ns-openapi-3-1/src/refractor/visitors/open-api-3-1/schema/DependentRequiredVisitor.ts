import { ObjectElement, cloneDeep } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

class DependentRequiredVisitor extends FallbackVisitor {
  public declare readonly element: ObjectElement;

  ObjectElement(objectElement: ObjectElement) {
    const result = cloneDeep(objectElement);
    this.element.classes.push('json-schema-dependentRequired');

    return result;
  }
}

export default DependentRequiredVisitor;
