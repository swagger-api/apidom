import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsYamlMappingVisitor from '../../generics/PatternedFieldsYamlMappingVisitor';
import { KindVisitor } from '../../generics';

const ServersVisitor = stampit(KindVisitor, PatternedFieldsYamlMappingVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Servers();
  },
});

export default ServersVisitor;
