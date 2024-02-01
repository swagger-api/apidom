import { StringElement, ArrayElement } from '@swagger-api/apidom-core';
import { FallbackVisitor, FallbackVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type { FallbackVisitorOptions as TypeVisitorOptions };

class TypeVisitor extends FallbackVisitor {
  public declare readonly element: StringElement | ArrayElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('json-schema-type');

    return result;
  }

  ArrayElement(arrayElement: ArrayElement) {
    const result = super.enter(arrayElement);
    this.element.classes.push('json-schema-type');

    return result;
  }
}

export default TypeVisitor;
