import stampit from 'stampit';
import { always } from 'ramda';

import { ValueVisitor } from '../generics';
import FixedFieldsJsonObjectVisitor from '../generics/FixedFieldsJsonObjectVisitor';

const OpenApi3_1Visitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'OpenApi']),
  },
  init() {
    this.element = new this.namespace.elements.OpenApi3_1();
  },
});

export default OpenApi3_1Visitor;
