import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const OAuthFlowVisitor = stampit(BaseOAuthFlowVisitor, {
  init() {
    this.element = new OAuthFlowElement();
  },
});

export default OAuthFlowVisitor;
