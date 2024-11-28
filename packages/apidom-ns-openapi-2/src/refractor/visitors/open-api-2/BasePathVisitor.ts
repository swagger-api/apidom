import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as BasePathVisitorOptions };

/**
 * @public
 */
class BasePathVisitor extends FallbackVisitor {
  declare public readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('swagger-base-path');

    return result;
  }
}

export default BasePathVisitor;
