import stampit from 'stampit';
import { always } from 'ramda';

import ScopesElement from '../../../../elements/Scopes';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ScopesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ScopesElement();
  },
});

export default ScopesVisitor;
