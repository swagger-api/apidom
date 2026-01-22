import {
  specificationObj as OpenApi3_1Specification,
  EncodingVisitorOptions,
  EncodingVisitor as EncodingVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import EncodingElement from '../../../../elements/Encoding.ts';

/**
 * @public
 */
export const BaseEncodingVisitor: typeof EncodingVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Encoding.$visitor;

export type { EncodingVisitorOptions };

/**
 * @public
 */
class EncodingVisitor extends BaseEncodingVisitor {
  declare public readonly element: EncodingElement;

  constructor(options: EncodingVisitorOptions) {
    super(options);
    this.element = new EncodingElement();
  }
}

export default EncodingVisitor;
