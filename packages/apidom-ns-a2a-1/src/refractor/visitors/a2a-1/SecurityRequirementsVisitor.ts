import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import SecurityRequirementsElement from '../../../elements/nces/SecurityRequirements.ts';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SecurityRequirementsVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SecurityRequirementsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SecurityRequirementsElement;

  constructor(options: SecurityRequirementsVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'SecurityRequirement'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityRequirementsVisitor;
