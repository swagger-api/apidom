import {
  specificationObj as AsyncApi2Specification,
  ContactVisitorOptions,
  ContactVisitor as ContactVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ContactElement from '../../../../elements/Contact.ts';

/**
 * @public
 */
export const BaseContactVisitor: typeof ContactVisitorType =
  AsyncApi2Specification.visitors.document.objects.Contact.$visitor;

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
