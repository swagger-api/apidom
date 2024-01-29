import {
  specificationObj as OpenApi3_1Specification,
  MapVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

class SecurityRequirementVisitor extends BaseSecurityRequirementVisitor {
  public declare readonly element: SecurityRequirementElement;

  constructor(options: MapVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
  }
}

export default SecurityRequirementVisitor;
