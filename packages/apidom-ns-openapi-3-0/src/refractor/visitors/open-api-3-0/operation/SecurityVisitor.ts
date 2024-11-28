import { Mixin } from 'ts-mixer';
import { ArrayElement, isObjectElement, BREAK } from '@swagger-api/apidom-core';

import OperationSecurityElement from '../../../../elements/nces/OperationSecurity.ts';
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
  declare public readonly element: OperationSecurityElement;

  constructor(options: SecurityVisitorOptions) {
    super(options);
    this.element = new OperationSecurityElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item) => {
      const specPath = isObjectElement(item)
        ? ['document', 'objects', 'SecurityRequirement']
        : ['value'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SecurityVisitor;
