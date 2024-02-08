import { MemberElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from './SpecificationVisitor';

export type { SpecificationVisitorOptions as SpecificationExtensionVisitorOptions };

class SpecificationExtensionVisitor extends SpecificationVisitor {
  public declare element: MemberElement;

  MemberElement(memberElement: MemberElement) {
    this.element = cloneDeep(memberElement);
    this.element.classes.push('specification-extension');

    return BREAK;
  }
}

export default SpecificationExtensionVisitor;
