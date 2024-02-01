import {
  specificationObj as OpenApi3_1Specification,
  HeaderVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import HeaderElement from '../../../../elements/Header';

const {
  visitors: {
    document: {
      objects: {
        Header: { $visitor: BaseHeaderVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { HeaderVisitorOptions };
class HeaderVisitor extends BaseHeaderVisitor {
  public declare readonly element: HeaderElement;

  constructor(options: HeaderVisitorOptions) {
    super(options);
    this.element = new HeaderElement();
  }
}

export default HeaderVisitor;
