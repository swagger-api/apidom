import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import TagsElement from '../../../elements/nces/Tags.ts';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor.ts';
import { isTagLikeElement } from '../../predicates.ts';

/**
 * @public
 */
export interface TagsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

/**
 * @public
 */
class TagsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  declare public readonly element: TagsElement;

  constructor(options: TagsVisitorOptions) {
    super(options);
    this.element = new TagsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const specPath = isTagLikeElement(item) ? ['document', 'objects', 'Tag'] : ['value'];
      const element = this.toRefractedElement(specPath, item);

      this.element.push(element);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default TagsVisitor;
