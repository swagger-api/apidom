import { ArrayElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export type { FallbackVisitorOptions as EnumVisitorOptions };

class EnumVisitor extends FallbackVisitor {
  public declare readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = this.enter(arrayElement);
    this.element.classes.push('json-schema-enum');

    return result;
  }
}

export default EnumVisitor;
