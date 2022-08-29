import stampit from 'stampit';
import { always } from 'ramda';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import LinkParametersElement from '../../../../elements/nces/LinkParameters';

const ParametersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: always(['value']),
  },
  init() {
    this.element = new LinkParametersElement();
  },
});

export default ParametersVisitor;
