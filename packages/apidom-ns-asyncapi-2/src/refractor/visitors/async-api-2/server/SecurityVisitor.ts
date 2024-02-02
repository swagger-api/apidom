import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isSecurityRequirementLikeElement } from '../../../predicates';
import ServerSecurityElement from '../../../../elements/nces/ServerSecurity';

class SecurityVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: ServerSecurityElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new ServerSecurityElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      if (isSecurityRequirementLikeElement(item)) {
        const serverElement = this.toRefractedElement(
          ['document', 'objects', 'SecurityRequirement'],
          item,
        );
        this.element.push(serverElement);
      } else {
        this.element.push(item);
      }
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityVisitor;
