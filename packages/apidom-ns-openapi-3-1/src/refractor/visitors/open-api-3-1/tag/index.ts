import {
  specificationObj as OpenApi3_1Specification,
  TagVisitorOptions,
  TagVisitor as TagVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import TagElement from '../../../../elements/Tag.ts';

/**
 * @public
 */
export const BaseTagVisitor: typeof TagVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Tag.$visitor;

export type { TagVisitorOptions };

/**
 * @public
 */
class TagVisitor extends BaseTagVisitor {
  public declare readonly element: TagElement;

  constructor(options: TagVisitorOptions) {
    super(options);
    this.element = new TagElement();
  }
}

export default TagVisitor;
