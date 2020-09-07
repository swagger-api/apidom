import stampit from 'stampit';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ExternalDocumentationVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: ['document', 'objects', 'ExternalDocumentation'],
  },
  init() {
    this.element = new this.namespace.elements.ExternalDocumentation();
  },
});

export default ExternalDocumentationVisitor;
