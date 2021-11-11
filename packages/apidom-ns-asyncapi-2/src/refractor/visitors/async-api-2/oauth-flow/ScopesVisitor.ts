import stampit from 'stampit';
import { always } from 'ramda';

import OAuthFlowScopesElement from '../../../../elements/nces/OAuthFlowScopes';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ScopesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new OAuthFlowScopesElement();
  },
});

export default ScopesVisitor;
