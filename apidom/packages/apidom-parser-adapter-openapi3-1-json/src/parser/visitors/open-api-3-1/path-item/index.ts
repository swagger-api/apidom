import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const PathItemVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'PathItem'],
  },
  init() {
    this.element = new this.namespace.elements.PathItem();
  },
});

export default PathItemVisitor;
