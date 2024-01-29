import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class OAuthFlowsVisitor extends BaseOAuthFlowsVisitor {
  public declare readonly element: OAuthFlowsElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
  }
}

export default OAuthFlowsVisitor;
