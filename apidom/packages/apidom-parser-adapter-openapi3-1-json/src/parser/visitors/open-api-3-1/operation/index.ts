import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const OperationVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Operation'],
  },
  init() {
    this.element = new this.namespace.elements.Operation();
  },
});

export default OperationVisitor;
