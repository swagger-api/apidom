import stampit from 'stampit';
import FixedFieldsJsonObjectVisitor from '../generics/FixedFieldsJsonObjectVisitor';

const OpenApi3_1Visitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'OpenApi'],
  },
  init() {
    this.element = new this.namespace.elements.OpenApi3_1();
  },
});

export default OpenApi3_1Visitor;
