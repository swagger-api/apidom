import stampit from 'stampit';
import { test, always } from 'ramda';

import PatternedFieldsJsonObjectVisitor from '../../generics/PatternedFieldsJsonObjectVisitor';

const ServersVisitor = stampit(PatternedFieldsJsonObjectVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Server']),
    fieldPatternPredicate: test(/^[A-Za-z0-9_\\-]+$/),
  },
  init() {
    this.element = new this.namespace.elements.Servers();
    this.element.classes.push('servers');
    this.element.attributes.set('docs', 'Servers_AsyncAPI_Initiative.html');
  },
});

export default ServersVisitor;
