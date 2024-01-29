import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationTagsElement from '../../../../elements/nces/OperationTags';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor';

class TagsVisitor extends FallbackVisitor {
  public declare element: OperationTagsElement;

  constructor(options: FallbackVisitorOptions) {
    super(options);
    this.element = new OperationTagsElement();
  }

  ArrayElement(arrayElement: ArrayElement) {
    this.element = this.element.concat(cloneDeep(arrayElement));

    return BREAK;
  }
}

export default TagsVisitor;
