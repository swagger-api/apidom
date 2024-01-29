import { ArrayElement } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

class EnumVisitor extends FallbackVisitor {
  public declare readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = super.enter(arrayElement);
    this.element.classes.push('json-schema-enum');

    return result;
  }
}

export default EnumVisitor;
