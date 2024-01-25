import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class $RefVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('reference-value');

    return result;
  }
}

export default $RefVisitor;
