import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SourceDescriptionsElement from '../../../elements/nces/SourceDescriptions';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

class SourceDescriptionsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public readonly element: SourceDescriptionsElement;

  constructor(options = {}) {
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
