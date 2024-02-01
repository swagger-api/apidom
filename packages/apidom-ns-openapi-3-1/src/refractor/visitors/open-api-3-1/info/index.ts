import {
  specificationObj as OpenApi3_1Specification,
  InfoVisitorOptions,
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

export type { InfoVisitorOptions };

class InfoVisitor extends BaseInfoVisitor {
  public declare readonly element: InfoElement;

  constructor(options: InfoVisitorOptions) {
    super(options);
    this.element = new InfoElement();
  }
}

export default InfoVisitor;
