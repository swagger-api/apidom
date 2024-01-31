import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ContactElement from '../../../../elements/Contact';

const {
  visitors: {
    document: {
      objects: {
        Contact: { $visitor: BaseContactVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class ContactVisitor extends BaseContactVisitor {
  public declare readonly element: ContactElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ContactElement();
  }
}

export default ContactVisitor;
