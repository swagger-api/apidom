import { StringElement, ArrayElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as TypeVisitorOptions };

/**
 * @public
 */
class TypeVisitor extends FallbackVisitor {
  declare public readonly element: StringElement | ArrayElement;

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
