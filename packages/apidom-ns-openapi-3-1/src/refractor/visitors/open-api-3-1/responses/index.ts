import {
  specificationObj as OpenApi3_1Specification,
  ResponsesVisitorOptions,
  ResponsesVisitor as ResponsesVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ResponsesElement from '../../../../elements/Responses.ts';

/**
 * @public
 */
export const BaseResponsesVisitor: typeof ResponsesVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Responses.$visitor;

export type { ResponsesVisitorOptions };

/**
 * @public
 */
class ResponsesVisitor extends BaseResponsesVisitor {
  declare public readonly element: ResponsesElement;

  constructor(options: ResponsesVisitorOptions) {
    super(options);
    this.element = new ResponsesElement();
  }
}

export default ResponsesVisitor;
