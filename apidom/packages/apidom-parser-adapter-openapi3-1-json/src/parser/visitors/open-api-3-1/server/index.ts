import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ServerVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Server'],
  },
  init() {
    this.element = new this.namespace.elements.Server();
  },
});

export default ServerVisitor;
