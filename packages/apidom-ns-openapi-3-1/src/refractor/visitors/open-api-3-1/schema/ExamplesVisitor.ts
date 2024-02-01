import { ArrayElement } from '@swagger-api/apidom-core';
import { FallbackVisitor, FallbackVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type { FallbackVisitorOptions as ExamplesVisitorOptions };

class ExamplesVisitor extends FallbackVisitor {
  public declare readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = super.enter(arrayElement);
    this.element.classes.push('json-schema-examples');

    return result;
  }
}

export default ExamplesVisitor;
