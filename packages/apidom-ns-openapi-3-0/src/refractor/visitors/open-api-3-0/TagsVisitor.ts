import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import TagsElement from '../../../elements/nces/Tags';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../FallbackVisitor';
import { isTagLikeElement } from '../../predicates';

export interface TagsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

class TagsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: TagsElement;

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
