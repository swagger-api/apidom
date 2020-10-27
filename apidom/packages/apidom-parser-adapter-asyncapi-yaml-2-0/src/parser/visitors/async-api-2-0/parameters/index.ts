import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsYamlMappingVisitor from '../../generics/PatternedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ParametersVisitor = stampit(KindVisitor, PatternedFieldsYamlMappingVisitor, {
  props: {
    // TODO(vladimir.gorej@gmail.com): replace generic value spec with concrete objects
    specPath: always(['kind']),
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Parameters();
  },
});

export default ParametersVisitor;
