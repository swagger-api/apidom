import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import OperationSecurityElement from '../../../../elements/nces/OperationSecurity';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

class SecurityVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: OperationSecurityElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new OperationSecurityElement();
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

export default SecurityVisitor;
