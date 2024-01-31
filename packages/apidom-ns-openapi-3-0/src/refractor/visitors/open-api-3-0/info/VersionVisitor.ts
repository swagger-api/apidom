import { StringElement } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class VersionVisitor extends FallbackVisitor {
  public declare readonly element: StringElement;

  StringElement(stringElement: StringElement) {
    const result = super.enter(stringElement);
    this.element.classes.push('api-version');
    this.element.classes.push('version');

    return result;
  }
}

export default VersionVisitor;
