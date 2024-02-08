import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

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
      const messageElement = this.toRefractedElement(
        ['document', 'objects', 'MessageExample'],
        item,
      );

      this.element.push(messageElement);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ExamplesVisitor;
