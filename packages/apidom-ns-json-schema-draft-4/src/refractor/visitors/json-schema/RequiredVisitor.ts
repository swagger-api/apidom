import { ArrayElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export type { FallbackVisitorOptions as RequiredVisitorOptions };

class RequiredVisitor extends FallbackVisitor {
  public declare readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = this.enter(arrayElement);
    this.element.classes.push('json-schema-required');

    return result;
  }
}

export default RequiredVisitor;
