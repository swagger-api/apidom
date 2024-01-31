import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import InfoElement from '../../../../elements/Info';

const {
  visitors: {
    document: {
      objects: {
        Info: { $visitor: BaseInfoVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class InfoVisitor extends BaseInfoVisitor {
  public declare readonly element: InfoElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
