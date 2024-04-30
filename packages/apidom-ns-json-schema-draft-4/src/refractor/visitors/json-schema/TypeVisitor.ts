import { StringElement, ArrayElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export type { FallbackVisitorOptions as TypeVisitorOptions };

class TypeVisitor extends FallbackVisitor {
  public declare readonly element: StringElement | ArrayElement;

  StringElement(stringElement: StringElement) {
    const result = this.enter(stringElement);
    this.element.classes.push('json-schema-type');

    return result;
  }

  ArrayElement(arrayElement: ArrayElement) {
    const result = this.enter(arrayElement);
    this.element.classes.push('json-schema-type');

    return result;
  }
}

export default TypeVisitor;
