import {
  specificationObj as OpenApi3_1Specification,
  SecurityRequirementVisitorOptions,
  SecurityRequirementVisitor as SecurityRequirementVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import SecurityRequirementElement from '../../../../elements/SecurityRequirement.ts';

/**
 * @public
 */
export const BaseSecurityRequirementVisitor: typeof SecurityRequirementVisitorType =
  OpenApi3_1Specification.visitors.document.objects.SecurityRequirement.$visitor;

export type { SecurityRequirementVisitorOptions };

/**
 * @public
 */
class SecurityRequirementVisitor extends BaseSecurityRequirementVisitor {
  declare public readonly element: SecurityRequirementElement;

  constructor(options: SecurityRequirementVisitorOptions) {
    super(options);
    this.element = new SecurityRequirementElement();
  }
}

export default SecurityRequirementVisitor;
