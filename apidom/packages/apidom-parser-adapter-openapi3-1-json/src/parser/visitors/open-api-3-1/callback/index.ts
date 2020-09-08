import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const CallbackVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'Callback'],
  },
  init() {
    this.element = new this.namespace.elements.Callback();
  },
});

export default CallbackVisitor;
