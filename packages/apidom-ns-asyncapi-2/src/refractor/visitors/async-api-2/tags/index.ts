import { Mixin } from 'ts-mixer';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import TagsElement from '../../../../elements/Tags';
import SpecificationVisitor, { SpecificationVisitorOptions } from '../../SpecificationVisitor';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface TagsVisitorOptions extends SpecificationVisitorOptions, FallbackVisitorOptions {}

class TagsVisitor extends Mixin(SpecificationVisitor, FallbackVisitor) {
  public declare readonly element: TagsElement;

  constructor(options: TagsVisitorOptions) {
    super(options);
    this.element = new TagsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    arrayElement.forEach((item: Element) => {
      const tagElement = this.toRefractedElement(['document', 'objects', 'Tag'], item);
      this.element.push(tagElement);
    });

    this.copyMetaAndAttributes(arrayElement, this.element);

    return BREAK;
  }
}

export default TagsVisitor;
