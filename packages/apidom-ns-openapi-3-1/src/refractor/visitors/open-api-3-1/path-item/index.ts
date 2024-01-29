import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import PathItemElement from '../../../../elements/PathItem';

const {
  visitors: {
    document: {
      objects: {
        PathItem: { $visitor: BasePathItemVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class PathItemVisitor extends BasePathItemVisitor {
  public declare readonly element: PathItemElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new PathItemElement();
  }
}

export default PathItemVisitor;
