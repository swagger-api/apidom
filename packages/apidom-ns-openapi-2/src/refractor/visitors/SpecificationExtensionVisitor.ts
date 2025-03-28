import { MemberElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from './SpecificationVisitor.ts';

export type { SpecificationVisitorOptions as SpecificationExtensionVisitorOptions };

/**
 * @public
 */
class SpecificationExtensionVisitor extends SpecificationVisitor {
  declare public element: MemberElement;

  MemberElement(memberElement: MemberElement) {
    this.element = cloneDeep(memberElement);
    this.element.classes.push('specification-extension');

    return BREAK;
  }
}

export default SpecificationExtensionVisitor;
