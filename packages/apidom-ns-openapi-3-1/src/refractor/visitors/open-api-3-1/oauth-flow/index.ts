import {
  specificationObj as OpenApi3_1Specification,
  OAuthFlowVisitorOptions,
  OAuthFlowVisitor as OAuthFlowVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OAuthFlowElement from '../../../../elements/OAuthFlow.ts';

/**
 * @public
 */
export const BaseOAuthFlowVisitor: typeof OAuthFlowVisitorType =
  OpenApi3_1Specification.visitors.document.objects.OAuthFlow.$visitor;

export type { OAuthFlowVisitorOptions };

/**
 * @public
 */
class OAuthFlowVisitor extends BaseOAuthFlowVisitor {
  public declare readonly element: OAuthFlowElement;

  constructor(options: OAuthFlowVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
  }
}

export default OAuthFlowVisitor;
