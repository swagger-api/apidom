import stampit from 'stampit';
import { always } from 'ramda';

import SecurityDefinitionsElement from '../../../../elements/SecurityDefinitions';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SecurityDefinitionsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'SecurityScheme']),
  },
  init() {
    this.element = new SecurityDefinitionsElement();
  },
});

export default SecurityDefinitionsVisitor;
