import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as ExternalValueVisitorOptions };

/**
 * @public
 */
class ExternalValueVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('reference-value');

    return result;
  }
}

export default ExternalValueVisitor;
