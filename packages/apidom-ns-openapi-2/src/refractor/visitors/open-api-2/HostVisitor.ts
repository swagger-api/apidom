import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export type { FallbackVisitorOptions as HostVisitorOptions };

class HostVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('swagger-host');

    return result;
  }
}

export default HostVisitor;
