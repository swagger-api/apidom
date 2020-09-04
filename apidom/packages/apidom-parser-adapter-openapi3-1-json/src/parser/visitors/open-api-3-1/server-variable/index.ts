import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ServerVariableVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'ServerVariable'],
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.ServerVariable();
  },
});

export default ServerVariableVisitor;
