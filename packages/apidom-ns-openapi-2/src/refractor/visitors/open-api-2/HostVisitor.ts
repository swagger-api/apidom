import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../FallbackVisitor';

class HostVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('swagger-host');

    return result;
  }
}

export default HostVisitor;
