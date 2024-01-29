import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ComponentsElement from '../../../../elements/Components';

const {
  visitors: {
    document: {
      objects: {
        Components: { $visitor: BaseComponentsVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class ComponentsVisitor extends BaseComponentsVisitor {
  public declare readonly element: ComponentsElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ComponentsElement();
  }
}

export default ComponentsVisitor;
