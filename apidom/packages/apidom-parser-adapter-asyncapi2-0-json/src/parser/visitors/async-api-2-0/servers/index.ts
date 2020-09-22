import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';
import { ValueVisitor } from '../../generics';

const ServersVisitor = stampit(ValueVisitor, PatternedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Servers();
  },
});

export default ServersVisitor;
