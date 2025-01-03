import { Mixin } from 'ts-mixer';
import { ArrayElement, BREAK, Element } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import StandardIdentifierElement from '../../../../elements/StandardIdentifier.ts';

/**
 * @public
 */
export interface StandardIdentifierVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class StandardIdentifierVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: StandardIdentifierElement;

  constructor(options: StandardIdentifierVisitorOptions) {
    super(options);
    this.element = new StandardIdentifierElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'StandardIdentifier'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default StandardIdentifierVisitor;
