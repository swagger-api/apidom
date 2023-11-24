import stampit from 'stampit';
import { always } from 'ramda';

import ComponentsParametersElement from '../../../../elements/nces/ComponentsParameters';
import FallbackVisitor from '../../FallbackVisitor';
import MapVisitor from '../../generics/MapVisitor';

const ParametersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['document', 'objects', 'Parameter']),
  },
  init() {
    this.element = new ComponentsParametersElement();
  },
});

export default ParametersVisitor;
