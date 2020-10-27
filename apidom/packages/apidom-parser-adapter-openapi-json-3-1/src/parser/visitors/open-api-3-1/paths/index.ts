import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const PathsVisitor = stampit(ValueVisitor, PatternedFieldsJsonObjectVisitor, {
  props: {
    fieldPatternPredicate: test(/^\/(?<path>.*)$/),
    specPath: always(['document', 'objects', 'PathItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new this.namespace.elements.Paths();
  },
});

export default PathsVisitor;
