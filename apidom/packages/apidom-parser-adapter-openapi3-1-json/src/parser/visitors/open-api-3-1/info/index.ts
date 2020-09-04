import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const InfoVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Info'],
  },
  init() {
    this.element = new this.namespace.elements.Info();
  },
});

export default InfoVisitor;
