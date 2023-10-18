import stampit from 'stampit';
import { always } from 'ramda';

import ResponsesDefinitionsElement from '../../../../elements/ResponsesDefinitions';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ResponsesDefinitionsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Response']),
  },
  init() {
    this.element = new ResponsesDefinitionsElement();
  },
});

export default ResponsesDefinitionsVisitor;
