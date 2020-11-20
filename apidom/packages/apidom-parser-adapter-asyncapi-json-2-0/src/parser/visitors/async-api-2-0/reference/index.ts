import stampit from 'stampit';
import { always } from 'ramda';

import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ReferenceVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Reference']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new this.namespace.elements.Reference();
  },
});

export default ReferenceVisitor;
