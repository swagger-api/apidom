import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

export type { FallbackVisitorOptions as HostVisitorOptions };

/**
 * @public
 */
class HostVisitor extends FallbackVisitor {
  declare public readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('swagger-host');

    return result;
  }
}

export default HostVisitor;
