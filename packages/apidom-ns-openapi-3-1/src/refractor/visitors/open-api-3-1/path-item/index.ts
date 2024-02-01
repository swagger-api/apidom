import {
  specificationObj as OpenApi3_1Specification,
  PathItemVisitorOptions,
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

export type { PathItemVisitorOptions };

class PathItemVisitor extends BasePathItemVisitor {
  public declare readonly element: PathItemElement;

  constructor(options: PathItemVisitorOptions) {
    super(options);
    this.element = new PathItemElement();
  }
}

export default PathItemVisitor;
