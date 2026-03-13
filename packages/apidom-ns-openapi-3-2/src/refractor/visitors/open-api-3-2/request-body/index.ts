import {
  specificationObj as OpenApi3_1Specification,
  RequestBodyVisitorOptions,
  RequestBodyVisitor as RequestBodyVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import RequestBodyElement from '../../../../elements/RequestBody.ts';

/**
 * @public
 */
export const BaseRequestBodyVisitor: typeof RequestBodyVisitorType =
  OpenApi3_1Specification.visitors.document.objects.RequestBody.$visitor;

export type { RequestBodyVisitorOptions };

/**
 * @public
 */
class RequestBodyVisitor extends BaseRequestBodyVisitor {
  declare public readonly element: RequestBodyElement;

  constructor(options: RequestBodyVisitorOptions) {
    super(options);
    this.element = new RequestBodyElement();
  }
}

export default RequestBodyVisitor;
