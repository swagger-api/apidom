import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import SecuritySchemeElement from '../../../../elements/SecurityScheme';

const {
  visitors: {
    document: {
      objects: {
        SecurityScheme: { $visitor: BaseSecuritySchemeVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class SecuritySchemeVisitor extends BaseSecuritySchemeVisitor {
  public declare readonly element: SecuritySchemeElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
  }
}

export default SecuritySchemeVisitor;
