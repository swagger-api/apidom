import {
  specificationObj as AsyncApi2Specification,
  OAuthFlowVisitorOptions,
  OAuthFlowVisitor as OAuthFlowVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import OAuthFlowElement from '../../../../elements/OauthFlow.ts';

/**
 * @public
 */
export const BaseOAuthFlowVisitor: typeof OAuthFlowVisitorType =
  AsyncApi2Specification.visitors.document.objects.OAuthFlow.$visitor;

export type { OAuthFlowVisitorOptions };

/**
 * @public
 */
class OAuthFlowVisitor extends BaseOAuthFlowVisitor {
  declare public readonly element: OAuthFlowElement;

  constructor(options: OAuthFlowVisitorOptions) {
    super(options);
    this.element = new OAuthFlowElement();
  }
}

export default OAuthFlowVisitor;
