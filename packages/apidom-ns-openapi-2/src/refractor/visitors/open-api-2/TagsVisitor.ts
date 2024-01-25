import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import SwaggerTagsElement from '../../../elements/nces/SwaggerTags';

class TagsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: SwaggerTagsElement;

  constructor(options: SpecificationVisitorOptions) {
    super(options);
    this.element = new SwaggerTagsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element): void => {
      const specPath = ['document', 'objects', 'Tag'];
      const element = this.toRefractedElement(specPath, item);
      this.element.push(element);
    });
    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default TagsVisitor;
