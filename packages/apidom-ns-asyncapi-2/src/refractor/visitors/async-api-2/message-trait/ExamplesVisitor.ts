import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';
import MessageTraitExamplesElement from '../../../../elements/nces/MessageTraitExamples.ts';

/**
 * @public
 */
export interface ExamplesVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class ExamplesVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: MessageTraitExamplesElement;

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
