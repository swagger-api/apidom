import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';

class ScenariosVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: ArrayElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('main-scenarios');
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Scenario'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ScenariosVisitor;
