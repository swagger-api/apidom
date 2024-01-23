import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class UrlVisitor extends FallbackVisitor {
  StringElement(stringElement: StringElement) {
    this.element = cloneDeep(stringElement);
    this.element.classes.push('source-description-url');

    return BREAK;
  }
}

export default UrlVisitor;
