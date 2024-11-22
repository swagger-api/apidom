import {
  specificationObj as OpenApi3_1Specification,
  SecuritySchemeVisitorOptions,
  SecuritySchemeVisitor as SecuritySchemeVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import SecuritySchemeElement from '../../../../elements/SecurityScheme.ts';

/**
 * @public
 */
export const BaseSecuritySchemeVisitor: typeof SecuritySchemeVisitorType =
  OpenApi3_1Specification.visitors.document.objects.SecurityScheme.$visitor;

export type { SecuritySchemeVisitorOptions };

/**
 * @public
 */
class SecuritySchemeVisitor extends BaseSecuritySchemeVisitor {
  public declare readonly element: SecuritySchemeElement;

  constructor(options: SecuritySchemeVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
  }
}

export default SecuritySchemeVisitor;
