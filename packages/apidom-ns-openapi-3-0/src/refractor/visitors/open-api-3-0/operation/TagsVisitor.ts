import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationTagsElement from '../../../../elements/nces/OperationTags.ts';
import FallbackVisitor, { FallbackVisitorOptions } from '../../FallbackVisitor.ts';

/**
 * @public
 */
export interface TagsVisitorOptions extends FallbackVisitorOptions {}

/**
 * @public
 */
class TagsVisitor extends FallbackVisitor {
  declare public element: OperationTagsElement;

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
