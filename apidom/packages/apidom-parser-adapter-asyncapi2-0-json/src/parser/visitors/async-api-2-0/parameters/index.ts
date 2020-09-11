import stampit from 'stampit';
import { test } from 'ramda';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';

const ParametersVisitor = stampit(PatternedFieldsJsonObjectVisitor, {
  props: {
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Parameters();
  },
});

export default ParametersVisitor;
