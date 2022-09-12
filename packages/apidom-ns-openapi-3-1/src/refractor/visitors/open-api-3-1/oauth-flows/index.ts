import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const OAuthFlowsVisitor = stampit(BaseOAuthFlowsVisitor, {
  init() {
    this.element = new OAuthFlowsElement();
  },
});

export default OAuthFlowsVisitor;
