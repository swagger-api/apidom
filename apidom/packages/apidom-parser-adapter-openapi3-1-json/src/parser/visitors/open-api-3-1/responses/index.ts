import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ResponsesVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Responses'],
  },
  init() {
    this.element = new this.namespace.elements.Responses();
  },
});

export default ResponsesVisitor;
