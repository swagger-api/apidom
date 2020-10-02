import stampit from 'stampit';

import SpecificationVisitor from './SpecificationVisitor';

const DocumentVisitor = stampit(SpecificationVisitor, {
  init() {
    this.element = new this.namespace.elements.Object();
  },
});

export default DocumentVisitor;
