import stampit from 'stampit';
import { always } from 'ramda';

import { KindVisitor } from '../generics';
import FixedFieldsYamlMappingVisitor from '../generics/FixedFieldsYamlMappingVisitor';

const OpenApi3_1Visitor = stampit(KindVisitor, FixedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
  },
  init() {
    this.element = new this.namespace.elements.OpenApi3_1();
  },
});

export default OpenApi3_1Visitor;
