import {
  specificationObj as AsyncApi2Specification,
  SecuritySchemeVisitorOptions,
  SecuritySchemeVisitor as SecuritySchemeVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import SecuritySchemeElement from '../../../../elements/SecurityScheme.ts';

export const BaseSecuritySchemeVisitor: typeof SecuritySchemeVisitorType =
  AsyncApi2Specification.visitors.document.objects.SecurityScheme.$visitor;

export type { SecuritySchemeVisitorOptions };

class SecuritySchemeVisitor extends BaseSecuritySchemeVisitor {
  declare public readonly element: SecuritySchemeElement;

  constructor(options: SecuritySchemeVisitorOptions) {
    super(options);
    this.element = new SecuritySchemeElement();
  }
}

export default SecuritySchemeVisitor;