import {
  specificationObj as OpenApi3_1Specification,
  PathItemVisitorOptions,
  PathItemVisitor as PathItemVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import PathItemElement from '../../../../elements/PathItem.ts';

/**
 * @public
 */
export const BasePathItemVisitor: typeof PathItemVisitorType =
  OpenApi3_1Specification.visitors.document.objects.PathItem.$visitor;

export type { PathItemVisitorOptions };

/**
 * @public
 */
class PathItemVisitor extends BasePathItemVisitor {
  public declare readonly element: PathItemElement;

  constructor(options: PathItemVisitorOptions) {
    super(options);
    this.element = new PathItemElement();
  }
}

export default PathItemVisitor;
