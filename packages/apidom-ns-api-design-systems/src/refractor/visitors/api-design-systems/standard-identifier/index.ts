import { Mixin } from 'ts-mixer';
import { ArrayElement, BREAK, Element } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import StandardIdentifierElement from '../../../../elements/StandardIdentifier';

export interface StandardIdentifierVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class StandardIdentifierVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: StandardIdentifierElement;

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
