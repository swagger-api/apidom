import {
  specificationObj as OpenApi3_1Specification,
  LinkVisitorOptions,
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

export type { LinkVisitorOptions };

class LinkVisitor extends BaseLinkVisitor {
  public declare readonly element: LinkElement;

  constructor(options: LinkVisitorOptions) {
    super(options);
    this.element = new LinkElement();
  }
}

export default LinkVisitor;
