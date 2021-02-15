import stampit from 'stampit';
import { always, test } from 'ramda';

import PatternedFieldsVisitor from '../../generics/PatternedFieldsVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import ServersElement from '../../../../elements/Servers';

const ServersVisitor = stampit(PatternedFieldsVisitor, FallbackVisitor, {
  props: {
    fieldPatternPredicate: test(/^[A-Za-z0-9_-]+$/),
    specPath: always(['document', 'objects', 'Server']),
    canSupportSpecificationExtensions: false,
  },
  init() {
    this.element = new ServersElement();
  },
});

export default ServersVisitor;
