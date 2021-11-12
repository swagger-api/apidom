import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import OAuthFlowScopesElement from '../../../../elements/nces/OAuthFlowScopes';

const ScopesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new OAuthFlowScopesElement();
  },
});

export default ScopesVisitor;
