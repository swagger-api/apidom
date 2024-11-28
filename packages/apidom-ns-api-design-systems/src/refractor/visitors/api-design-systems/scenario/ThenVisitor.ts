import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';

/**
 * @public
 */
export interface ThenVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class ThenVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: ArrayElement;

  constructor(options: ThenVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('scenario-then');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Requirement'];
      const element = this.toRefractedElement(specPath, item);
      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}
export default ThenVisitor;
