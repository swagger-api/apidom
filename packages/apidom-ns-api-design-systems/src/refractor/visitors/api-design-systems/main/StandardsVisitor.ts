import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';

export interface StandardsVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class StandardsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: ArrayElement;

  constructor(options: StandardsVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('main-standards');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Standard'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default StandardsVisitor;
