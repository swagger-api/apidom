import stampit from 'stampit';
import { always } from 'ramda';

import { ValueVisitor } from '../../generics';
import FixedFieldsJsonObjectVisitor from '../../generics/FixedFieldsJsonObjectVisitor';

const ParameterVisitor = stampit(ValueVisitor, FixedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
  },
  init() {
    this.element = new this.namespace.elements.Parameter();
  },
});

export default ParameterVisitor;
