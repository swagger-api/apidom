import { StringElement } from '@swagger-api/apidom-core';
import { FallbackVisitor } from '@swagger-api/apidom-ns-openapi-3-0';

class $refVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('reference-value');

    return result;
  }
}

export default $refVisitor;
