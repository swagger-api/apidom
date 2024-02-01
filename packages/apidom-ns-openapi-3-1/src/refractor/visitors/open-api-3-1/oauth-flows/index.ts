import {
  specificationObj as OpenApi3_1Specification,
  OAuthFlowsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OAuthFlowsElement from '../../../../elements/OAuthFlows';

const {
  visitors: {
    document: {
      objects: {
        OAuthFlows: { $visitor: BaseOAuthFlowsVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { OAuthFlowsVisitorOptions };

class OAuthFlowsVisitor extends BaseOAuthFlowsVisitor {
  public declare readonly element: OAuthFlowsElement;

  constructor(options: OAuthFlowsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
  }
}

export default OAuthFlowsVisitor;
