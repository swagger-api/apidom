import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const LicenseVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'License']),
  },
  init() {
    this.element = new this.namespace.elements.License();
  },
});

export default LicenseVisitor;
