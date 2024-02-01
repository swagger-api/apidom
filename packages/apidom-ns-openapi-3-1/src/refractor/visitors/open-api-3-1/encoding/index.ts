import {
  specificationObj as OpenApi3_1Specification,
  EncodingVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import EncodingElement from '../../../../elements/Encoding';

const {
  visitors: {
    document: {
      objects: {
        Encoding: { $visitor: BaseEncodingVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { EncodingVisitorOptions };

class EncodingVisitor extends BaseEncodingVisitor {
  public declare readonly element: EncodingElement;

  constructor(options: EncodingVisitorOptions) {
    super(options);
    this.element = new EncodingElement();
  }
}

export default EncodingVisitor;
