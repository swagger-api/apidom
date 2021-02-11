import stampit from 'stampit';
import { test, always } from 'ramda';

import PathsElement from '../../../../elements/Paths';
import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const PathsVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^\/(?<path>.*)$/),
    specPath: always(['document', 'objects', 'PathItem']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new PathsElement();
  },
});

export default PathsVisitor;
