import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ParametersVisitor = stampit(ValueVisitor, PatternedFieldsJsonObjectVisitor, {
  props: {
    // TODO(vladimir.gorej@gmail.com): replace generic value spec with concrete objects
    specPath: always(['value']),
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Parameters();
  },
});

export default ParametersVisitor;
