import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsYamlMappingVisitor from '../../generics/PatternedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const PathsVisitor = stampit(KindVisitor, PatternedFieldsYamlMappingVisitor, {
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
