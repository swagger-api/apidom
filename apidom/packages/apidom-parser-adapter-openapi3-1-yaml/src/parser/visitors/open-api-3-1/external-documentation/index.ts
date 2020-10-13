import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../../generics';
import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';

const ExternalDocumentationVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'ExternalDocumentation']),
  },
  init() {
    this.element = new this.namespace.elements.ExternalDocumentation();
  },
});

export default ExternalDocumentationVisitor;
