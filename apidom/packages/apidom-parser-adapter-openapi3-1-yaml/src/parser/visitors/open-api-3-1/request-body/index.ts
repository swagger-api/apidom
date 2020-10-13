import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsYamlMappingVisitor from '../../generics/FixedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const RequestBodyVisitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'RequestBody']),
  },
  init() {
    this.element = new this.namespace.elements.RequestBody();
  },
});

export default RequestBodyVisitor;
