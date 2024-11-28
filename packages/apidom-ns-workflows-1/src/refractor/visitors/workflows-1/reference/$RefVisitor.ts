import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as $RefVisitorOptions };

/**
 * @public
 */
export class $RefVisitor extends FallbackVisitor {
  declare public readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('reference-value');
    return result;
  }
}

export default $RefVisitor;
