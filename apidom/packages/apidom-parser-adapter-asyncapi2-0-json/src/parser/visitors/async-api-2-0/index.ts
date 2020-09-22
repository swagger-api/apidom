import stampit from 'stampit';
import { always } from 'ramda';

import { ValueVisitor } from '../generics';
import FixedFieldsJsonObjectVisitor from '../generics/FixedFieldsJsonObjectVisitor';

const AsyncApi2_0Visitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'AsyncApi']),
  },
  init() {
    this.element = new this.namespace.elements.AsyncApi2_0();
  },
});

export default AsyncApi2_0Visitor;
