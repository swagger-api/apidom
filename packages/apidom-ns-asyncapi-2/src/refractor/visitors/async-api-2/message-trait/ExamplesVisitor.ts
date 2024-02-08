import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';
import MessageTraitExamplesElement from '../../../../elements/nces/MessageTraitExamples';

export interface ExamplesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

class ExamplesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: MessageTraitExamplesElement;

  constructor(options: ExamplesVisitorOptions) {
    super(options);
    this.element = new MessageTraitExamplesElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const messageExampleElement = this.toRefractedElement(
        ['document', 'objects', 'MessageExample'],
        item,
      );

      this.element.push(messageExampleElement);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default ExamplesVisitor;
