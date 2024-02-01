import {
  specificationObj as OpenApi3_1Specification,
  SecuritySchemeVisitorOptions,
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

export type { SecuritySchemeVisitorOptions };
class SecuritySchemeVisitor extends BaseSecuritySchemeVisitor {
  public declare readonly element: SecuritySchemeElement;

  constructor(options: SecuritySchemeVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
  }
}

export default SecuritySchemeVisitor;
