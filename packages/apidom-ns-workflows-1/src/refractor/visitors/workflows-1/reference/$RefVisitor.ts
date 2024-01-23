import { StringElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';

export class $RefVisitor extends FallbackVisitor {
  StringElement(stringElement: StringElement) {
    this.element = cloneDeep(stringElement);
    this.element.classes.push('reference-value');

    return BREAK;
  }
}

export default $RefVisitor;
