import { MemberElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor from './SpecificationVisitor';

class SpecificationExtensionVisitor extends SpecificationVisitor {
  public declare element: MemberElement;

  MemberElement(memberElement: MemberElement) {
    this.element = cloneDeep(memberElement);
    this.element.classes.push('specification-extension');

    return BREAK;
  }
}

export default SpecificationExtensionVisitor;
