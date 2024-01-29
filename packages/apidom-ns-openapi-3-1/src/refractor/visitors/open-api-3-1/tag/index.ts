import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class TagVisitor extends BaseTagVisitor {
  public declare readonly element: TagElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new TagElement();
  }
}

export default TagVisitor;
