import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates.ts';
import { isReferenceElement } from '../../../../predicates.ts';
import OperationParametersElement from '../../../../elements/nces/OperationParameters.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface ParametersVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ParametersVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: OperationParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new OperationParametersElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = isReferenceLikeElement(item)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Parameter'];
      const element = this.toRefractedElement(specPath, item);

      if (isReferenceElement(element)) {
        element.setMetaProperty('referenced-element', 'parameter');
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ParametersVisitor;
