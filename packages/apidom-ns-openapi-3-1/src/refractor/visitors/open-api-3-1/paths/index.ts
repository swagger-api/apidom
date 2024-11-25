import {
  specificationObj as OpenApi3_1Specification,
  PathsVisitorOptions,
  PathsVisitor as PathsVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import PathsElement from '../../../../elements/Paths.ts';

/**
 * @public
 */
export const BasePathsVisitor: typeof PathsVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Paths.$visitor;

export type { PathsVisitorOptions };

/**
 * @public
 */
class PathsVisitor extends BasePathsVisitor {
  public declare readonly element: PathsElement;

  constructor(options: PathsVisitorOptions) {
    super(options);
    this.element = new PathsElement();
  }
}

export default PathsVisitor;
