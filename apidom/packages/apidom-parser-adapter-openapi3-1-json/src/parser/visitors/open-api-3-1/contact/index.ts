import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ContactVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Contact'],
  },
  init() {
    this.element = new this.namespace.elements.License();
  },
});

export default ContactVisitor;
