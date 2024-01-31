import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class EncodingVisitor extends BaseEncodingVisitor {
  public declare readonly element: EncodingElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new EncodingElement();
  }
}

export default EncodingVisitor;
