import stampit from 'stampit';
import { always } from 'ramda';

import ParametersDefinitionsElement from '../../../../elements/ParametersDefinitions';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const ParametersDefinitionsVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
  },
  init() {
    this.element = new ParametersDefinitionsElement();
  },
});

export default ParametersDefinitionsVisitor;
