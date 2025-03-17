import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

export type { FallbackVisitorOptions as VersionVisitorOptions };

/**
 * @public
 */
class VersionVisitor extends FallbackVisitor {
  declare public readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);

    this.element.classes.push('arazzo-version');
    this.element.classes.push('version');

    return result;
  }
}

export default VersionVisitor;
