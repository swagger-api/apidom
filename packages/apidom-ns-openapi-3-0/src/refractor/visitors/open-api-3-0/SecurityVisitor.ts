import { Mixin } from 'ts-mixer';
import { ArrayElement, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SecurityElement from '../../../elements/nces/Security';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';

export interface SecurityVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class SecurityVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: SecurityElement;

  constructor(options: SecurityVisitorOptions) {
    super(options);
    this.element = new SecurityElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item) => {
      if (isObjectElement(item)) {
        const element = this.toRefractedElement(
          ['document', 'objects', 'SecurityRequirement'],
          item,
        );
        this.element.push(element);
      } else {
        this.element.push(cloneDeep(item));
      }
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityVisitor;
