import {
  specificationObj as OpenApi3_1Specification,
  HeaderVisitorOptions,
  HeaderVisitor as HeaderVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import HeaderElement from '../../../../elements/Header.ts';

/**
 * @public
 */
export const BaseHeaderVisitor: typeof HeaderVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Header.$visitor;

export type { HeaderVisitorOptions };

/**
 * @public
 */
class HeaderVisitor extends BaseHeaderVisitor {
  declare public readonly element: HeaderElement;

  constructor(options: HeaderVisitorOptions) {
    super(options);
    this.element = new HeaderElement();
  }
}

export default HeaderVisitor;
