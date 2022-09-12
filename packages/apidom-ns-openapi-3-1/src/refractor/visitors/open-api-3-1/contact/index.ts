import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const ContactVisitor = stampit(BaseContactVisitor, {
  init() {
    this.element = new ContactElement();
  },
});

export default ContactVisitor;
