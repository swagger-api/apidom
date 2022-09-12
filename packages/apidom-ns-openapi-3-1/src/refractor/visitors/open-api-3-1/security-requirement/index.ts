import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement';

const {
  visitors: {
    document: {
      objects: {
        SecurityRequirement: { $visitor: BaseSecurityRequirementVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const SecurityRequirementVisitor = stampit(BaseSecurityRequirementVisitor, {
  init() {
    this.element = new SecurityRequirementElement();
  },
});

export default SecurityRequirementVisitor;
