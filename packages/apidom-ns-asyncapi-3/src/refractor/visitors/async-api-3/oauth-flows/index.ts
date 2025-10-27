import {
  specificationObj as AsyncApi2Specification,
	OAuthFlowsVisitorOptions,
 	OAuthFlowsVisitor as OAuthFlowsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import OAuthFlowsElement from '../../../../elements/OAuthFlows.ts';

/**
 * @public
 */
export const BaseOAuthFlowsVisitor: typeof OAuthFlowsVisitorType =
  AsyncApi2Specification.visitors.document.objects.OAuthFlows.$visitor;

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
