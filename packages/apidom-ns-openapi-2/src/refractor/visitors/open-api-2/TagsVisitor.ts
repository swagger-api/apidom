import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import SwaggerTagsElement from '../../../elements/nces/SwaggerTags.ts';

/**
 * @public
 */
export interface TagsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class TagsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: SwaggerTagsElement;

  constructor(options: TagsVisitorOptions) {
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
