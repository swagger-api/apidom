import { Mixin } from 'ts-mixer';
import { ArrayElement, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SecurityElement from '../../../elements/nces/Security.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

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
  declare public readonly element: SecurityElement;

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
