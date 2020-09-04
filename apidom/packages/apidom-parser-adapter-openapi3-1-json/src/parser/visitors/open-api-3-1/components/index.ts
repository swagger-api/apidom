import stampit from 'stampit';
import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ComponentsVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Components'],
  },
  init() {
    this.element = new this.namespace.elements.Components();
  },
});

export default ComponentsVisitor;
