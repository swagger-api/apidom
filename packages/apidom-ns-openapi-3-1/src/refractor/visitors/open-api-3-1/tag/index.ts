import {
  specificationObj as OpenApi3_1Specification,
  TagVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import TagElement from '../../../../elements/Tag';

const {
  visitors: {
    document: {
      objects: {
        Tag: { $visitor: BaseTagVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { TagVisitorOptions };

class TagVisitor extends BaseTagVisitor {
  public declare readonly element: TagElement;

  constructor(options: TagVisitorOptions) {
    super(options);
    this.element = new TagElement();
  }
}

export default TagVisitor;
