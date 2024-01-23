import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

class VersionVisitor extends FallbackVisitor {
  StringElement(stringElement: StringElement) {
    this.element = cloneDeep(stringElement);
    this.element.classes.push('workflow-version');
    this.element.classes.push('version');

    return BREAK;
  }
}

export default VersionVisitor;
