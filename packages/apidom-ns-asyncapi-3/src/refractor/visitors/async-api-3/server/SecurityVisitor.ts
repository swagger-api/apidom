import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-asyncapi-2';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

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
  declare public readonly element: ArrayElement;

  constructor(options: SecurityVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      let element;

      if (isReferenceLikeElement(item)) {
        element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
        element.setMetaProperty('referenced-element', 'serverSecurity');
      } else {
        element = this.toRefractedElement(['document', 'objects', 'SecurityScheme'], item);
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityVisitor;
