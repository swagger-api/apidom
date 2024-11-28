import { ArrayElement } from '@swagger-api/apidom-core';
import { FallbackVisitor, FallbackVisitorOptions } from '@swagger-api/apidom-ns-openapi-3-0';

export type { FallbackVisitorOptions as EnumVisitorOptions };

/**
 * @public
 */
class EnumVisitor extends FallbackVisitor {
  declare public readonly element: ArrayElement;

  ArrayElement(arrayElement: ArrayElement) {
    const result = super.enter(arrayElement);
    this.element.classes.push('json-schema-enum');

    return result;
  }
}

export default EnumVisitor;
