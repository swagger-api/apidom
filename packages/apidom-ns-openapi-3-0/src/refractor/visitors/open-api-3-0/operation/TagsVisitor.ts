import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationTagsElement from '../../../../elements/nces/OperationTags';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

export interface TagsVisitorOptions extends FallbackVisitorOptions {}

class TagsVisitor extends FallbackVisitor {
  public declare element: OperationTagsElement;

  constructor(options: TagsVisitorOptions) {
    super(options);
    this.element = new OperationTagsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default TagsVisitor;
