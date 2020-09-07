import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ReferenceVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Reference'],
  },
  init() {
    this.element = new this.namespace.elements.Reference();
  },
});

export default ReferenceVisitor;
