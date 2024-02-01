import {
  specificationObj as OpenApi3_1Specification,
  OAuthFlowVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OAuthFlowElement from '../../../../elements/OAuthFlow';

const {
  visitors: {
    document: {
      objects: {
        OAuthFlow: { $visitor: BaseOAuthFlowVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { OAuthFlowVisitorOptions };
class OAuthFlowVisitor extends BaseOAuthFlowVisitor {
  public declare readonly element: OAuthFlowElement;

  constructor(options: OAuthFlowVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
  }
}

export default OAuthFlowVisitor;
