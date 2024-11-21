import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as $RefVisitorOptions };

/**
 * @public
 */
class $RefVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = this.enter(stringElement);
    this.element.classes.push('reference-value');

    return result;
  }
}

export default $RefVisitor;
