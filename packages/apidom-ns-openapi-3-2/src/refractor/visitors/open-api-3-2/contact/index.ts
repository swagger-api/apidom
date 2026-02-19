import {
  specificationObj as OpenApi3_1Specification,
  ContactVisitorOptions,
  ContactVisitor as ContactVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ContactElement from '../../../../elements/Contact.ts';

/**
 * @public
 */
export const BaseContactVisitor: typeof ContactVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Contact.$visitor;

export type { ContactVisitorOptions };

/**
 * @public
 */
class ContactVisitor extends BaseContactVisitor {
  declare public readonly element: ContactElement;

  constructor(options: ContactVisitorOptions) {
    super(options);
    this.element = new ContactElement();
  }
}

export default ContactVisitor;
