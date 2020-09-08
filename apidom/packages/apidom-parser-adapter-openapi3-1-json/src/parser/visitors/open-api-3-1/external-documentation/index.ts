import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ExternalDocumentationVisitor = stampit(FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ExternalDocumentation']),
  },
  init() {
    this.element = new this.namespace.elements.ExternalDocumentation();
  },
});

export default ExternalDocumentationVisitor;
