import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class UrlVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('server-url');

    return result;
  }
}

export default UrlVisitor;
