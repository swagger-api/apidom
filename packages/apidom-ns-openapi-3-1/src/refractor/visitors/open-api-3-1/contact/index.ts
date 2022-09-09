import stampit from 'stampit';
import { always } from 'ramda';

import ContactElement from '../../../../elements/Contact';
import FallbackVisitor from '../../FallbackVisitor';
import FixedFieldsVisitor from '../../generics/FixedFieldsVisitor';

const ContactVisitor = stampit(FixedFieldsVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Contact']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ContactElement();
  },
});

export default ContactVisitor;
