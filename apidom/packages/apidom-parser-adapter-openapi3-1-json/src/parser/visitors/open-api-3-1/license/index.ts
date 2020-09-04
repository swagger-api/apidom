import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const LicenseVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'License'],
  },
  init() {
    this.element = new this.namespace.elements.License();
  },
});

export default LicenseVisitor;
