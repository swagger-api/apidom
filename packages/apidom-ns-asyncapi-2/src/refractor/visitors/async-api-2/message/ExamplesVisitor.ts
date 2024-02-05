import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import MessageExamplesElement from '../../../../elements/nces/MessageExamples';

export interface ExamplesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class ExamplesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: MessageExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new MessageExamplesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      let element;

      if (isObjectElement(item)) {
        element = this.toRefractedElement(['document', 'objects', 'MessageExample'], item);
      } else {
        element = cloneDeep(item);
      }

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ExamplesVisitor;
