import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';

class BasePathVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('swagger-base-path');

    return result;
  }
}

export default BasePathVisitor;
