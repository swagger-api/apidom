import { ArrayElement } from '@swagger-api/apidom-core';
import { FallbackVisitor, FallbackVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type { FallbackVisitorOptions as RequiredVisitorOptions };

class RequiredVisitor extends FallbackVisitor {
  public declare readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = super.enter(arrayElement);
    this.element.classes.push('json-schema-required');

    return result;
  }
}

export default RequiredVisitor;
