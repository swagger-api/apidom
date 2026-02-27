import {
  specificationObj as OpenApi3_1Specification,
  ResponseVisitorOptions,
  ResponseVisitor as ResponseVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ResponseElement from '../../../../elements/Response.ts';

/**
 * @public
 */
export const BaseResponseVisitor: typeof ResponseVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Response.$visitor;

export type { ResponseVisitorOptions };

/**
 * @public
 */
class ResponseVisitor extends BaseResponseVisitor {
  declare public readonly element: ResponseElement;

  constructor(options: ResponseVisitorOptions) {
    super(options);
    this.element = new ResponseElement();
  }
}

export default ResponseVisitor;
