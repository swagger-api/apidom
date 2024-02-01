import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface UrlVisitorOptions extends FallbackVisitorOptions {}

class UrlVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('server-url');

    return result;
  }
}

export default UrlVisitor;
