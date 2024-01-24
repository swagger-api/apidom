import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class UrlVisitor extends FallbackVisitor {
  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('source-description-url');
    return result;
  }
}

export default UrlVisitor;
