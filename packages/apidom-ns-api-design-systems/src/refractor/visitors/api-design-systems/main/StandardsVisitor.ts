import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

class StandardsVisitor extends Mixin(FallbackVisitor, SpecificationVisitor) {
  public readonly element: ArrayElement;

  constructor(options = {}) {
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
