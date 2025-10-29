import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import ComponentOperationsElement from '../../../../elements/nces/ComponentOperations.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import { isReferenceElement } from '@swagger-api/apidom-ns-asyncapi-2';

/**
 * @public
 */
export interface OperationsVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class OperationsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: ComponentOperationsElement;

  constructor(options:OperationsVisitorOptions) {
    super(options);
    this.element = new ComponentOperationsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const element = cloneDeep(item);

      if (isReferenceElement(element)) {
        element.classes.push('operations-name');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default OperationsVisitor;
