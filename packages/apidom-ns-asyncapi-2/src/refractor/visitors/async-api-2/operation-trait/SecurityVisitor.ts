import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import OperationTraitSecurityElement from '../../../../elements/nces/OperationTraitSecurity.ts';

/**
 * @public
 */
export interface SecurityVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: OperationTraitSecurityElement;

  constructor(options: SecurityVisitorOptions) {
    super(options);
    this.element = new OperationTraitSecurityElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const securityRequirementElement = this.toRefractedElement(
        ['document', 'objects', 'SecurityRequirement'],
        item,
      );
      this.element.push(securityRequirementElement);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityVisitor;
