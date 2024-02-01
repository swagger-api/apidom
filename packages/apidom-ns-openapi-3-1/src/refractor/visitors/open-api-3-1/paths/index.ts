import {
  specificationObj as OpenApi3_1Specification,
  PathsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import PathsElement from '../../../../elements/Paths';

const {
  visitors: {
    document: {
      objects: {
        Paths: { $visitor: BasePathsVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { PathsVisitorOptions };
class PathsVisitor extends BasePathsVisitor {
  public declare readonly element: PathsElement;

  constructor(options: PathsVisitorOptions) {
    super(options);
    this.element = new PathsElement();
  }
}

export default PathsVisitor;
