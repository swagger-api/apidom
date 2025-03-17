import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SourceDescriptionsElement from '../../../elements/nces/SourceDescriptions.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';

/**
 * @public
 */
export interface SourceDescriptionsVisitorOptions
  extends SpecificationVisitorOptions,
    FallbackVisitorOptions {}

/**
 * @public
 */
class SourceDescriptionsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SourceDescriptionsElement;

  constructor(options: SourceDescriptionsVisitorOptions) {
    super(options);
    this.element = new SourceDescriptionsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'SourceDescription'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default SourceDescriptionsVisitor;
