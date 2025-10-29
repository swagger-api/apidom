import {
  specificationObj as AsyncApi2Specification,
  TagsVisitor as TagsVisitorType,
  TagsVisitorOptions
} from '@swagger-api/apidom-ns-asyncapi-2';

import TagsElement from '../../../../elements/Tags.ts';

/**
 * @public
 */
export const BaseTagsVisitor: typeof TagsVisitorType =
  AsyncApi2Specification.visitors.document.objects.Tags.$visitor;

export type { TagsVisitorOptions };

/**
 * @public
 */
class TagsVisitor extends BaseTagsVisitor {
  declare public readonly element: TagsElement;

  constructor(options: TagsVisitorOptions) {
    super(options);
    this.element = new TagsElement();
  }
}

export default TagsVisitor;
