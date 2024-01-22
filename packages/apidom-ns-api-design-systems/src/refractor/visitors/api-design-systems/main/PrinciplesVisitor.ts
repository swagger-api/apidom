import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

class PrinciplesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: ArrayElement;

  constructor(options = {}) {
    super(options);
    this.element = new ArrayElement();
    this.element.classes.push('main-principles');
  }

  public ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Principle'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default PrinciplesVisitor;
