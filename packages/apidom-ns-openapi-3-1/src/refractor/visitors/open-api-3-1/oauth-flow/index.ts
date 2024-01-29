import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class OAuthFlowVisitor extends BaseOAuthFlowVisitor {
  public declare readonly element: OAuthFlowElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
  }
}

export default OAuthFlowVisitor;
