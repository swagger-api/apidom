import {
  specificationObj as OpenApi3_1Specification,
  OAuthFlowsVisitorOptions,
  OAuthFlowsVisitor as OAuthFlowsVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import OAuthFlowsElement from '../../../../elements/OAuthFlows.ts';

/**
 * @public
 */
export const BaseOAuthFlowsVisitor: typeof OAuthFlowsVisitorType =
  OpenApi3_1Specification.visitors.document.objects.OAuthFlows.$visitor;

export type { OAuthFlowsVisitorOptions };

/**
 * @public
 */
class OAuthFlowsVisitor extends BaseOAuthFlowsVisitor {
  declare public readonly element: OAuthFlowsElement;

  constructor(options: OAuthFlowsVisitorOptions) {
    super(options);
    this.element = new OAuthFlowsElement();
  }
}

export default OAuthFlowsVisitor;
