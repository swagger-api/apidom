import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const RequestBodyVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'RequestBody'],
  },
  init() {
    this.element = new this.namespace.elements.RequestBody();
  },
});

export default RequestBodyVisitor;
