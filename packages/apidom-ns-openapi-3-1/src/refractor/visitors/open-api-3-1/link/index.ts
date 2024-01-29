import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import LinkElement from '../../../../elements/Link';

const {
  visitors: {
    document: {
      objects: {
        Link: { $visitor: BaseLinkVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class LinkVisitor extends BaseLinkVisitor {
  public declare readonly element: LinkElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new LinkElement();
  }
}

export default LinkVisitor;
