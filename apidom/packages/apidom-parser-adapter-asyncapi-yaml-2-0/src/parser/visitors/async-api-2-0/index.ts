import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../generics';
import FixedFieldsYamlMappingVisitor from '../generics/FixedFieldsYamlMappingVisitor';

const AsyncApi2_0Visitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'AsyncApi']),
  },
  init() {
    this.element = new this.namespace.elements.AsyncApi2_0();
  },
});

export default AsyncApi2_0Visitor;
