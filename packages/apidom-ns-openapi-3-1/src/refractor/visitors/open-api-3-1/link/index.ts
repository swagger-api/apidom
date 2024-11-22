import {
  specificationObj as OpenApi3_1Specification,
  LinkVisitorOptions,
  LinkVisitor as LinkVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import LinkElement from '../../../../elements/Link.ts';

/**
 * @public
 */
export const BaseLinkVisitor: typeof LinkVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Link.$visitor;

export type { LinkVisitorOptions };

/**
 * @public
 */
class LinkVisitor extends BaseLinkVisitor {
  public declare readonly element: LinkElement;

  constructor(options: LinkVisitorOptions) {
    super(options);
    this.element = new LinkElement();
  }
}

export default LinkVisitor;
